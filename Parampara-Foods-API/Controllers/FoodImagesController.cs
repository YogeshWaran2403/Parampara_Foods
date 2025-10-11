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
    public class FoodImagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FoodImagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/foodimages/{foodId}
        [HttpGet("{foodId}")]
        public async Task<ActionResult<IEnumerable<FoodImageDto>>> GetFoodImages(int foodId)
        {
            var images = await _context.FoodImages
                .Where(img => img.FoodId == foodId)
                .OrderBy(img => img.DisplayOrder)
                .Select(img => new FoodImageDto
                {
                    ImageId = img.ImageId,
                    FoodId = img.FoodId,
                    ImageUrl = img.ImageUrl,
                    AltText = img.AltText,
                    DisplayOrder = img.DisplayOrder,
                    IsPrimary = img.IsPrimary,
                    CreatedAt = img.CreatedAt
                })
                .ToListAsync();

            return Ok(images);
        }

        // POST: api/foodimages
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FoodImageDto>> CreateFoodImage(CreateFoodImageDto createDto)
        {
            // Verify food item exists
            var foodItem = await _context.FoodItems.FindAsync(createDto.FoodId);
            if (foodItem == null)
            {
                return NotFound("Food item not found");
            }

            // If this is set as primary, unset other primary images for this food
            if (createDto.IsPrimary)
            {
                var existingPrimaryImages = await _context.FoodImages
                    .Where(img => img.FoodId == createDto.FoodId && img.IsPrimary)
                    .ToListAsync();

                foreach (var img in existingPrimaryImages)
                {
                    img.IsPrimary = false;
                }
            }

            var foodImage = new FoodImage
            {
                FoodId = createDto.FoodId,
                ImageUrl = createDto.ImageUrl,
                AltText = createDto.AltText,
                DisplayOrder = createDto.DisplayOrder,
                IsPrimary = createDto.IsPrimary
            };

            _context.FoodImages.Add(foodImage);
            await _context.SaveChangesAsync();

            var imageDto = new FoodImageDto
            {
                ImageId = foodImage.ImageId,
                FoodId = foodImage.FoodId,
                ImageUrl = foodImage.ImageUrl,
                AltText = foodImage.AltText,
                DisplayOrder = foodImage.DisplayOrder,
                IsPrimary = foodImage.IsPrimary,
                CreatedAt = foodImage.CreatedAt
            };

            return CreatedAtAction(nameof(GetFoodImages), new { foodId = foodImage.FoodId }, imageDto);
        }

        // PUT: api/foodimages/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateFoodImage(int id, UpdateFoodImageDto updateDto)
        {
            var foodImage = await _context.FoodImages.FindAsync(id);
            if (foodImage == null)
            {
                return NotFound();
            }

            // If this is set as primary, unset other primary images for this food
            if (updateDto.IsPrimary && !foodImage.IsPrimary)
            {
                var existingPrimaryImages = await _context.FoodImages
                    .Where(img => img.FoodId == foodImage.FoodId && img.IsPrimary && img.ImageId != id)
                    .ToListAsync();

                foreach (var img in existingPrimaryImages)
                {
                    img.IsPrimary = false;
                }
            }

            foodImage.ImageUrl = updateDto.ImageUrl;
            foodImage.AltText = updateDto.AltText;
            foodImage.DisplayOrder = updateDto.DisplayOrder;
            foodImage.IsPrimary = updateDto.IsPrimary;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/foodimages/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFoodImage(int id)
        {
            var foodImage = await _context.FoodImages.FindAsync(id);
            if (foodImage == null)
            {
                return NotFound();
            }

            _context.FoodImages.Remove(foodImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
