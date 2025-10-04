using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.DTOs;
using Parampara_Foods.Models;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        // GET: api/roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetRoles()
        {
            var roles = _roleManager.Roles.ToList();
            var roleDtos = new List<RoleDto>();

            foreach (var role in roles)
            {
                var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);
                roleDtos.Add(new RoleDto
                {
                    RoleId = 0, // Identity roles don't have integer IDs
                    Name = role.Name,
                    Description = $"System role: {role.Name}",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow, // Identity doesn't track creation date
                    UpdatedAt = DateTime.UtcNow,
                    UserCount = usersInRole.Count
                });
            }

            return Ok(roleDtos.OrderBy(r => r.Name));
        }

        // GET: api/roles/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetActiveRoles()
        {
            var roles = _roleManager.Roles.ToList();
            var roleDtos = new List<RoleDto>();

            foreach (var role in roles)
            {
                var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);
                roleDtos.Add(new RoleDto
                {
                    RoleId = 0,
                    Name = role.Name,
                    Description = $"System role: {role.Name}",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    UserCount = usersInRole.Count
                });
            }

            return Ok(roleDtos.OrderBy(r => r.Name));
        }
    }
}

