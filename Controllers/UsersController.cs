using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Models;
using Parampara_Foods.DTOs;
using Parampara_Foods.Data;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public UsersController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userManager.Users
                .Include(u => u.Role)
                .ToListAsync();
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var identityRoles = await _userManager.GetRolesAsync(user);
                userDtos.Add(new UserDto
                {
                    Id = user.Id,
                    Email = user.Email ?? string.Empty,
                    FullName = user.FullName ?? user.UserName ?? string.Empty,
                    Address = user.Address ?? string.Empty,
                    RoleId = user.RoleId,
                    RoleName = user.Role?.Name,
                    Role = user.Role?.Name ?? identityRoles.FirstOrDefault() ?? "User"
                });
            }

            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(string id)
        {
            var user = await _userManager.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);
            
            if (user == null)
                return NotFound();

            var identityRoles = await _userManager.GetRolesAsync(user);
            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                FullName = user.FullName ?? user.UserName ?? string.Empty,
                Address = user.Address ?? string.Empty,
                RoleId = user.RoleId,
                RoleName = user.Role?.Name,
                Role = user.Role?.Name ?? identityRoles.FirstOrDefault() ?? "User"
            };

            return Ok(userDto);
        }

        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateUserRole(string id, [FromBody] UpdateUserRoleDto dto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            // Update custom role
            if (dto.RoleId.HasValue)
            {
                var role = await _context.Roles.FindAsync(dto.RoleId.Value);
                if (role == null)
                    return BadRequest("Invalid role ID");

                user.RoleId = dto.RoleId.Value;
                await _userManager.UpdateAsync(user);
            }
            else
            {
                // Fallback to Identity roles for backward compatibility
                var currentRoles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, currentRoles);

                if (!string.IsNullOrEmpty(dto.Role))
                {
                    var result = await _userManager.AddToRoleAsync(user, dto.Role);
                    if (!result.Succeeded)
                        return BadRequest(result.Errors);
                }
            }

            return Ok("User role updated successfully");
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName,
                Address = dto.Address,
                RoleId = dto.RoleId
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Assign Identity Role for backward compatibility
            if (!string.IsNullOrEmpty(dto.Role))
            {
                await _userManager.AddToRoleAsync(user, dto.Role);
            }

            // Return the created user
            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                FullName = user.FullName ?? user.UserName ?? string.Empty,
                Address = user.Address ?? string.Empty,
                RoleId = user.RoleId,
                RoleName = user.Role?.Name,
                Role = user.Role?.Name ?? dto.Role
            };

            return Ok(userDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User deleted successfully");
        }

        // GET: api/users/search?q={query}
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<UserDto>>> SearchUsers([FromQuery] string q, [FromQuery] int limit = 10)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Ok(new List<UserDto>());
            }

            var users = await _userManager.Users
                .Include(u => u.Role)
                .Where(u => u.Email.Contains(q) || 
                           u.FullName.Contains(q) || 
                           u.UserName.Contains(q))
                .Take(limit)
                .ToListAsync();

            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var identityRoles = await _userManager.GetRolesAsync(user);
                userDtos.Add(new UserDto
                {
                    Id = user.Id,
                    Email = user.Email ?? string.Empty,
                    FullName = user.FullName ?? user.UserName ?? string.Empty,
                    Address = user.Address ?? string.Empty,
                    RoleId = user.RoleId,
                    RoleName = user.Role?.Name,
                    Role = user.Role?.Name ?? identityRoles.FirstOrDefault() ?? "User"
                });
            }

            return Ok(userDtos);
        }

        // GET: api/users/suggestions?q={query}
        [HttpGet("suggestions")]
        public async Task<ActionResult<IEnumerable<string>>> GetUserSuggestions([FromQuery] string q, [FromQuery] int limit = 5)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Ok(new List<string>());
            }

            var suggestions = await _userManager.Users
                .Where(u => u.Email.Contains(q) || u.FullName.Contains(q))
                .Select(u => u.Email)
                .Distinct()
                .OrderBy(email => email)
                .Take(limit)
                .ToListAsync();

            return Ok(suggestions);
        }
    }
}
