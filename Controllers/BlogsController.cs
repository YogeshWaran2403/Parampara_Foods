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
    public class BlogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BlogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDto>>> GetBlogs()
        {
            var blogs = await _context.Blogs
                .Include(b => b.Author)
                .Where(b => b.IsPublished)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BlogDto
                {
                    BlogId = b.BlogId,
                    Title = b.Title,
                    Content = b.Content,
                    AuthorId = b.AuthorId,
                    AuthorName = b.Author.FullName ?? b.Author.Email!,
                    ImageUrl = b.ImageUrl,
                    IsPublished = b.IsPublished,
                    CreatedAt = b.CreatedAt
                })
                .ToListAsync();

            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDto>> GetBlog(int id)
        {
            var blog = await _context.Blogs
                .Include(b => b.Author)
                .Where(b => b.BlogId == id && b.IsPublished)
                .Select(b => new BlogDto
                {
                    BlogId = b.BlogId,
                    Title = b.Title,
                    Content = b.Content,
                    AuthorId = b.AuthorId,
                    AuthorName = b.Author.FullName ?? b.Author.Email!,
                    ImageUrl = b.ImageUrl,
                    IsPublished = b.IsPublished,
                    CreatedAt = b.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (blog == null)
                return NotFound();

            return blog;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BlogDto>> CreateBlog(CreateBlogDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized();

            var blog = new Blog
            {
                Title = dto.Title,
                Content = dto.Content,
                AuthorId = userId,
                ImageUrl = dto.ImageUrl
            };

            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            var blogDto = new BlogDto
            {
                BlogId = blog.BlogId,
                Title = blog.Title,
                Content = blog.Content,
                AuthorId = blog.AuthorId,
                AuthorName = user.FullName ?? user.Email!,
                ImageUrl = blog.ImageUrl,
                IsPublished = blog.IsPublished,
                CreatedAt = blog.CreatedAt
            };

            return CreatedAtAction(nameof(GetBlog), new { id = blog.BlogId }, blogDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBlog(int id, CreateBlogDto dto)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return NotFound();

            blog.Title = dto.Title;
            blog.Content = dto.Content;
            blog.ImageUrl = dto.ImageUrl;
            blog.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return NotFound();

            blog.IsPublished = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}