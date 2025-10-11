using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.DTOs;
using Parampara_Foods.Models;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FoodsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/foods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodDto>>> GetFoods([FromQuery] int? categoryId = null)
        {
            // First, get the basic food items without images (much faster)
            var query = _context.FoodItems
                .Include(f => f.Category)
                .Where(f => f.IsAvailable);

            if (categoryId.HasValue)
            {
                query = query.Where(f => f.CategoryId == categoryId.Value);
            }

            var foods = await query.ToListAsync();

            // Get all food IDs
            var foodIds = foods.Select(f => f.FoodId).ToList();

            // Get images for all foods in a separate query (more efficient)
            var images = await _context.FoodImages
                .Where(img => foodIds.Contains(img.FoodId))
                .OrderBy(img => img.FoodId)
                .ThenBy(img => img.DisplayOrder)
                .ToListAsync();

            // Group images by food ID
            var imagesByFoodId = images.GroupBy(img => img.FoodId)
                .ToDictionary(g => g.Key, g => g.ToList());

            var foodDtos = foods.Select(f => new FoodDto
            {
                FoodId = f.FoodId,
                Name = f.Name,
                Description = f.Description,
                MRP = f.MRP,
                SalePrice = f.SalePrice,
                CategoryId = f.CategoryId,
                CategoryName = f.Category.Name,
                IsAvailable = f.IsAvailable,
                IsOrganic = f.IsOrganic,
                StockQuantity = f.StockQuantity,
                ImageUrl = f.ImageUrl,
                Images = imagesByFoodId.ContainsKey(f.FoodId) 
                    ? imagesByFoodId[f.FoodId].Select(img => new FoodImageDto
                    {
                        ImageId = img.ImageId,
                        FoodId = img.FoodId,
                        ImageUrl = img.ImageUrl,
                        AltText = img.AltText,
                        DisplayOrder = img.DisplayOrder,
                        IsPrimary = img.IsPrimary,
                        CreatedAt = img.CreatedAt
                    }).ToList()
                    : new List<FoodImageDto>(),
                Brand = f.Brand,
                Unit = f.Unit,
                Quantity = f.Quantity,
                Tags = f.Tags,
                ViewCount = f.ViewCount,
                Rating = f.Rating,
                ReviewCount = f.ReviewCount,
                IsLowStock = f.StockQuantity <= f.MinStockLevel
            }).ToList();

            return Ok(foodDtos);
        }

        // GET: api/foods/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDto>> GetFood(int id)
        {
            // Get food item without images first (faster)
            var food = await _context.FoodItems
                .Include(f => f.Category)
                .FirstOrDefaultAsync(f => f.FoodId == id);

            if (food == null)
            {
                return NotFound();
            }

            // Get images separately (more efficient)
            var images = await _context.FoodImages
                .Where(img => img.FoodId == id)
                .OrderBy(img => img.DisplayOrder)
                .ToListAsync();

            // Increment view count
            food.ViewCount++;
            await _context.SaveChangesAsync();

            var foodDto = new FoodDto
            {
                FoodId = food.FoodId,
                Name = food.Name,
                Description = food.Description,
                MRP = food.MRP,
                SalePrice = food.SalePrice,
                CategoryId = food.CategoryId,
                CategoryName = food.Category.Name,
                IsAvailable = food.IsAvailable,
                IsOrganic = food.IsOrganic,
                StockQuantity = food.StockQuantity,
                ImageUrl = food.ImageUrl,
                Images = images.Select(img => new FoodImageDto
                {
                    ImageId = img.ImageId,
                    FoodId = img.FoodId,
                    ImageUrl = img.ImageUrl,
                    AltText = img.AltText,
                    DisplayOrder = img.DisplayOrder,
                    IsPrimary = img.IsPrimary,
                    CreatedAt = img.CreatedAt
                }).ToList(),
                Brand = food.Brand,
                Unit = food.Unit,
                Quantity = food.Quantity,
                Tags = food.Tags,
                ViewCount = food.ViewCount,
                Rating = food.Rating,
                ReviewCount = food.ReviewCount,
                IsLowStock = food.StockQuantity <= food.MinStockLevel
            };

            return Ok(foodDto);
        }

        // POST: api/foods
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FoodDto>> CreateFood(CreateFoodDto createFoodDto)
        {
            var food = new FoodItem
            {
                Name = createFoodDto.Name,
                Description = createFoodDto.Description,
                MRP = createFoodDto.MRP,
                SalePrice = createFoodDto.SalePrice,
                CategoryId = createFoodDto.CategoryId,
                IsOrganic = createFoodDto.IsOrganic,
                StockQuantity = createFoodDto.StockQuantity,
                ImageUrl = createFoodDto.ImageUrl,
                Brand = createFoodDto.Brand,
                Unit = createFoodDto.Unit ?? "kg",
                Quantity = createFoodDto.Quantity,
                Tags = createFoodDto.Tags,
                MinStockLevel = createFoodDto.MinStockLevel,
                IsAvailable = true
            };

            _context.FoodItems.Add(food);
            await _context.SaveChangesAsync();

            // Load the category for the response
            await _context.Entry(food).Reference(f => f.Category).LoadAsync();

            var foodDto = new FoodDto
            {
                FoodId = food.FoodId,
                Name = food.Name,
                Description = food.Description,
                MRP = food.MRP,
                SalePrice = food.SalePrice,
                CategoryId = food.CategoryId,
                CategoryName = food.Category.Name,
                IsAvailable = food.IsAvailable,
                IsOrganic = food.IsOrganic,
                StockQuantity = food.StockQuantity,
                ImageUrl = food.ImageUrl,
                Brand = food.Brand,
                Unit = food.Unit,
                Quantity = food.Quantity,
                Tags = food.Tags,
                ViewCount = food.ViewCount,
                Rating = food.Rating,
                ReviewCount = food.ReviewCount,
                IsLowStock = food.StockQuantity <= food.MinStockLevel
            };

            return CreatedAtAction(nameof(GetFood), new { id = food.FoodId }, foodDto);
        }

        // PUT: api/foods/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFood(int id, UpdateFoodDto updateFoodDto)
        {
            var food = await _context.FoodItems.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }

            food.Name = updateFoodDto.Name;
            food.Description = updateFoodDto.Description;
            food.MRP = updateFoodDto.MRP;
            food.SalePrice = updateFoodDto.SalePrice;
            food.CategoryId = updateFoodDto.CategoryId;
            food.IsAvailable = updateFoodDto.IsAvailable;
            food.IsOrganic = updateFoodDto.IsOrganic;
            food.StockQuantity = updateFoodDto.StockQuantity;
            food.ImageUrl = updateFoodDto.ImageUrl;
            food.Brand = updateFoodDto.Brand;
            food.Unit = updateFoodDto.Unit;
            food.Quantity = updateFoodDto.Quantity;
            food.Tags = updateFoodDto.Tags;
            food.MinStockLevel = updateFoodDto.MinStockLevel;
            food.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/foods/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFood(int id)
        {
            var food = await _context.FoodItems.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }

            _context.FoodItems.Remove(food);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET: api/foods/search?q={query}
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<FoodDto>>> SearchFoods([FromQuery] string q, [FromQuery] int limit = 10)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Ok(new List<FoodDto>());
            }

            var query = _context.FoodItems
                .Include(f => f.Category)
                .Where(f => f.IsAvailable && 
                    (f.Name.Contains(q) || 
                     f.Description.Contains(q) || 
                     (f.Brand != null && f.Brand.Contains(q)) ||
                     (f.Tags != null && f.Tags.Contains(q)) ||
                     f.Category.Name.Contains(q)))
                .OrderBy(f => f.Name)
                .Take(limit);

            var foods = await query.ToListAsync();

            var foodDtos = foods.Select(f => new FoodDto
            {
                FoodId = f.FoodId,
                Name = f.Name,
                Description = f.Description,
                MRP = f.MRP,
                SalePrice = f.SalePrice,
                CategoryId = f.CategoryId,
                CategoryName = f.Category.Name,
                IsAvailable = f.IsAvailable,
                IsOrganic = f.IsOrganic,
                StockQuantity = f.StockQuantity,
                ImageUrl = f.ImageUrl,
                Brand = f.Brand,
                Unit = f.Unit,
                Quantity = f.Quantity,
                Tags = f.Tags,
                ViewCount = f.ViewCount,
                Rating = f.Rating,
                ReviewCount = f.ReviewCount,
                IsLowStock = f.StockQuantity <= f.MinStockLevel
            });

            return Ok(foodDtos);
        }

        // GET: api/foods/suggestions?q={query}
        [HttpGet("suggestions")]
        public async Task<ActionResult<IEnumerable<string>>> GetFoodSuggestions([FromQuery] string q, [FromQuery] int limit = 5)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Ok(new List<string>());
            }

            var suggestions = await _context.FoodItems
                .Where(f => f.IsAvailable && f.Name.Contains(q))
                .Select(f => f.Name)
                .Distinct()
                .OrderBy(name => name)
                .Take(limit)
                .ToListAsync();

            return Ok(suggestions);
        }
    }
}