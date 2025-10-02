using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<ImageController> _logger;

        public ImageController(IWebHostEnvironment environment, ILogger<ImageController> logger)
        {
            _environment = environment;
            _logger = logger;
        }

        [HttpPost("upload")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromQuery] string type = "products")
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "No file uploaded" });
                }

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest(new { message = "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed." });
                }

                // Validate file size (max 5MB)
                if (file.Length > 5 * 1024 * 1024)
                {
                    return BadRequest(new { message = "File size cannot exceed 5MB" });
                }

                // Validate type parameter
                if (type != "products" && type != "categories")
                {
                    return BadRequest(new { message = "Type must be either 'products' or 'categories'" });
                }

                // Generate unique filename
                var fileName = $"{Guid.NewGuid()}{fileExtension}";
                var uploadPath = Path.Combine(_environment.WebRootPath, "images", type);
                
                // Ensure directory exists
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, fileName);

                // Save file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Return the URL path
                var imageUrl = $"/images/{type}/{fileName}";
                
                _logger.LogInformation($"Image uploaded successfully: {imageUrl}");

                return Ok(new { 
                    message = "Image uploaded successfully", 
                    imageUrl = imageUrl,
                    fileName = fileName
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading image");
                return StatusCode(500, new { message = "Internal server error while uploading image" });
            }
        }

        [HttpDelete("{type}/{fileName}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteImage(string type, string fileName)
        {
            try
            {
                // Validate type parameter
                if (type != "products" && type != "categories")
                {
                    return BadRequest(new { message = "Type must be either 'products' or 'categories'" });
                }

                var filePath = Path.Combine(_environment.WebRootPath, "images", type, fileName);
                
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound(new { message = "Image not found" });
                }

                System.IO.File.Delete(filePath);
                
                _logger.LogInformation($"Image deleted successfully: /images/{type}/{fileName}");

                return Ok(new { message = "Image deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting image");
                return StatusCode(500, new { message = "Internal server error while deleting image" });
            }
        }

        [HttpGet("list/{type}")]
        [Authorize(Roles = "Admin")]
        public IActionResult ListImages(string type)
        {
            try
            {
                // Validate type parameter
                if (type != "products" && type != "categories")
                {
                    return BadRequest(new { message = "Type must be either 'products' or 'categories'" });
                }

                var uploadPath = Path.Combine(_environment.WebRootPath, "images", type);
                
                if (!Directory.Exists(uploadPath))
                {
                    return Ok(new { images = new string[0] });
                }

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var imageFiles = Directory.GetFiles(uploadPath)
                    .Where(f => allowedExtensions.Contains(Path.GetExtension(f).ToLowerInvariant()))
                    .Select(f => new {
                        fileName = Path.GetFileName(f),
                        imageUrl = $"/images/{type}/{Path.GetFileName(f)}",
                        uploadDate = System.IO.File.GetCreationTime(f)
                    })
                    .OrderByDescending(f => f.uploadDate)
                    .ToArray();

                return Ok(new { images = imageFiles });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error listing images");
                return StatusCode(500, new { message = "Internal server error while listing images" });
            }
        }
    }
}

