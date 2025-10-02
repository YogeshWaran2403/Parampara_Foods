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
            var query = _context.FoodItems
                .Include(f => f.Category)
                .Where(f => f.IsAvailable);

            if (categoryId.HasValue)
            {
                query = query.Where(f => f.CategoryId == categoryId.Value);
            }

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
            }).ToList();

            return Ok(foodDtos);
        }

        // GET: api/foods/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDto>> GetFood(int id)
        {
            var food = await _context.FoodItems
                .Include(f => f.Category)
                .FirstOrDefaultAsync(f => f.FoodId == id);

            if (food == null)
            {
                return NotFound();
            }

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
    }
}