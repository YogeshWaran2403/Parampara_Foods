using Microsoft.AspNetCore.Mvc;
using Parampara_Foods.Services;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly DataSeedingService _seedingService;

        public SeedController(DataSeedingService seedingService)
        {
            _seedingService = seedingService;
        }

        [HttpPost("populate")]
        public async Task<IActionResult> PopulateDatabase()
        {
            try
            {
                await _seedingService.SeedDataAsync();
                return Ok(new { message = "Database populated successfully with sample data!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed to populate database", error = ex.Message });
            }
        }
    }
}
