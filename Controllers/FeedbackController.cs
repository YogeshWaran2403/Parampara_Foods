using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.DTOs;
using Parampara_Foods.Models;
using System.Security.Claims;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedbackDto>>> GetFeedback([FromQuery] int? foodId = null)
        {
            var query = _context.Feedbacks
                .Include(f => f.User)
                .AsQueryable();

            if (foodId.HasValue)
            {
                query = query.Where(f => f.FoodId == foodId.Value);
            }

            var feedback = await query
                .OrderByDescending(f => f.CreatedAt)
                .Select(f => new FeedbackDto
                {
                    FeedbackId = f.FeedbackId,
                    UserId = f.UserId,
                    UserName = f.User.FullName ?? f.User.Email!,
                    Rating = f.Rating,
                    Comment = f.Comment,
                    CreatedAt = f.CreatedAt,
                    FoodId = f.FoodId
                })
                .ToListAsync();

            return Ok(feedback);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FeedbackDto>> CreateFeedback(CreateFeedbackDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized();

            // Validate food ID if provided
            if (dto.FoodId.HasValue)
            {
                var foodItem = await _context.FoodItems.FindAsync(dto.FoodId.Value);
                if (foodItem == null)
                    return BadRequest("Invalid food ID");
            }

           
            var feedback = new Feedback
            {
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                FoodId = dto.FoodId
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            var feedbackDto = new FeedbackDto
            {
                FeedbackId = feedback.FeedbackId,
                UserId = feedback.UserId,
                UserName = user.FullName ?? user.Email!,
                Rating = feedback.Rating,
                Comment = feedback.Comment,
                CreatedAt = feedback.CreatedAt,
                FoodId = feedback.FoodId
            };

            return CreatedAtAction(nameof(GetFeedback), new { id = feedback.FeedbackId }, feedbackDto);
        }

        [HttpGet("average-rating")]
        public async Task<ActionResult<decimal>> GetAverageRating([FromQuery] int? foodId = null)
        {
            var query = _context.Feedbacks.AsQueryable();

            if (foodId.HasValue)
            {
                query = query.Where(f => f.FoodId == foodId.Value);
            }

            var averageRating = await query
                .Select(f => (decimal?)f.Rating)
                .AverageAsync();

            return Ok(averageRating ?? 0);
        }
    }
}