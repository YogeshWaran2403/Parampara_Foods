using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Parampara_Foods.DTOs;
using Parampara_Foods.Models;
using Parampara_Foods.Data;
using Parampara_Foods.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly PhoneAuthService _phoneAuthService;

        public AuthController(
            UserManager<ApplicationUser> userManager, 
            IConfiguration configuration,
            PhoneAuthService phoneAuthService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _phoneAuthService = phoneAuthService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName,
                Address = dto.Address ?? "Not provided",
                AuthProvider = "local",
                CreatedAt = DateTime.UtcNow,
                LastLoginAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Assign Role
            await _userManager.AddToRoleAsync(user, dto.Role);

            return Ok("User registered successfully!");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized("Invalid credentials");

            if (!await _userManager.CheckPasswordAsync(user, dto.Password))
                return Unauthorized("Invalid credentials");

            // Update last login
            user.LastLoginAt = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            var token = await GenerateJwtTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new AuthResponse
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddDays(7).ToString("O")
            });
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleAuth(GoogleAuthDto dto)
        {
            try
            {
                // Check if user exists with Google ID
                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.GoogleId == dto.GoogleId);
                var isNewUser = false;

                if (user == null)
                {
                    // Check if user exists with email
                    user = await _userManager.FindByEmailAsync(dto.Email);
                    
                    if (user == null)
                    {
                        // Create new user
                        user = new ApplicationUser
                        {
                            UserName = dto.Email,
                            Email = dto.Email,
                            FullName = dto.Name,
                            GoogleId = dto.GoogleId,
                            GoogleEmail = dto.Email,
                            GoogleName = dto.Name,
                            GooglePicture = dto.Picture,
                            AuthProvider = "google",
                            CreatedAt = DateTime.UtcNow,
                            LastLoginAt = DateTime.UtcNow
                        };

                        var result = await _userManager.CreateAsync(user);
                        if (!result.Succeeded)
                            return BadRequest(result.Errors);

                        // Assign default role
                        await _userManager.AddToRoleAsync(user, "User");
                        isNewUser = true;
                    }
                    else
                    {
                        // Update existing user with Google info
                        user.GoogleId = dto.GoogleId;
                        user.GoogleEmail = dto.Email;
                        user.GoogleName = dto.Name;
                        user.GooglePicture = dto.Picture;
                        user.AuthProvider = "google";
                        user.LastLoginAt = DateTime.UtcNow;
                        await _userManager.UpdateAsync(user);
                    }
                }
                else
                {
                    // Update last login
                    user.LastLoginAt = DateTime.UtcNow;
                    await _userManager.UpdateAsync(user);
                }

                var token = await GenerateJwtTokenAsync(user);
                var roles = await _userManager.GetRolesAsync(user);

                return Ok(new GoogleAuthResponse
                {
                    Token = token,
                    Expiration = DateTime.UtcNow.AddDays(7).ToString("O"),
                    UserId = user.Id,
                    Email = user.Email ?? "",
                    FullName = user.FullName ?? "",
                    Role = roles.FirstOrDefault() ?? "User",
                    AuthProvider = "google"
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Google authentication failed: {ex.Message}");
            }
        }

        [HttpPost("phone/send-code")]
        public async Task<IActionResult> SendPhoneVerificationCode(PhoneAuthRequestDto dto)
        {
            var result = await _phoneAuthService.SendVerificationCodeAsync(dto.PhoneNumber);
            
            if (result.Success)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpPost("phone/verify")]
        public async Task<IActionResult> VerifyPhoneCode(PhoneAuthVerifyDto dto)
        {
            // Get session ID from header or request
            var sessionId = Request.Headers["X-Session-Id"].FirstOrDefault();
            if (string.IsNullOrEmpty(sessionId))
            {
                return BadRequest("Session ID is required");
            }

            var result = await _phoneAuthService.VerifyCodeAndAuthenticateAsync(dto, sessionId);
            
            if (result != null)
            {
                return Ok(result);
            }
            
            return Unauthorized("Invalid verification code");
        }

        private async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User";

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Role, role),
                new Claim("auth_provider", user.AuthProvider ?? "local"),
                new Claim("phone_number", user.PhoneNumber ?? "")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
