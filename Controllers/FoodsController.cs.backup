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

            var foods = await query
                .Select(f => new FoodDto
                {
                    FoodId = f.FoodId,
                    Name = f.Name,
                    Description = f.Description,
                    Price = f.Price,
                    CategoryId = f.CategoryId,
                    CategoryName = f.Category.Name,
                    IsAvailable = f.IsAvailable,
                    IsOrganic = f.IsOrganic,
                    StockQuantity = f.StockQuantity,
                    ImageUrl = f.ImageUrl
                })
                .ToListAsync();

            return Ok(foods);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDto>> GetFood(int id)
        {
            var food = await _context.FoodItems
                .Include(f => f.Category)
                .Where(f => f.FoodId == id && f.IsAvailable)
                .Select(f => new FoodDto
                {
                    FoodId = f.FoodId,
                    Name = f.Name,
                    Description = f.Description,
                    Price = f.Price,
                    CategoryId = f.CategoryId,
                    CategoryName = f.Category.Name,
                    IsAvailable = f.IsAvailable,
                    IsOrganic = f.IsOrganic,
                    StockQuantity = f.StockQuantity,
                    ImageUrl = f.ImageUrl
                })
                .FirstOrDefaultAsync();

            if (food == null)
                return NotFound();

            return food;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FoodDto>> CreateFood(CreateFoodDto dto)
        {
            var category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null)
                return BadRequest("Invalid category ID");

            var food = new FoodItem
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                IsOrganic = dto.IsOrganic,
                StockQuantity = dto.StockQuantity,
                ImageUrl = dto.ImageUrl
            };

            _context.FoodItems.Add(food);
            await _context.SaveChangesAsync();

            var foodDto = new FoodDto
            {
                FoodId = food.FoodId,
                Name = food.Name,
                Description = food.Description,
                Price = food.Price,
                CategoryId = food.CategoryId,
                CategoryName = category.Name,
                IsAvailable = food.IsAvailable,
                IsOrganic = food.IsOrganic,
                StockQuantity = food.StockQuantity,
                ImageUrl = food.ImageUrl
            };

            return CreatedAtAction(nameof(GetFood), new { id = food.FoodId }, foodDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFood(int id, CreateFoodDto dto)
        {
            var food = await _context.FoodItems.FindAsync(id);
            if (food == null)
                return NotFound();

            food.Name = dto.Name;
            food.Description = dto.Description;
            food.Price = dto.Price;
            food.CategoryId = dto.CategoryId;
            food.IsOrganic = dto.IsOrganic;
            food.StockQuantity = dto.StockQuantity;
            food.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFood(int id)
        {
            var food = await _context.FoodItems.FindAsync(id);
            if (food == null)
                return NotFound();

            food.IsAvailable = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}