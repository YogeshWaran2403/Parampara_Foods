using Microsoft.AspNetCore.Identity;
using Parampara_Foods.Models;
using Parampara_Foods.DTOs;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Parampara_Foods.Services
{
    public class PhoneAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PhoneAuthService> _logger;
        private readonly Dictionary<string, string> _verificationCodes = new();

        public PhoneAuthService(
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            ILogger<PhoneAuthService> logger)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
            
            // Initialize Twilio
            var accountSid = _configuration["Twilio:AccountSid"];
            var authToken = _configuration["Twilio:AuthToken"];
            
            if (!string.IsNullOrEmpty(accountSid) && !string.IsNullOrEmpty(authToken))
            {
                TwilioClient.Init(accountSid, authToken);
            }
        }

        public async Task<PhoneVerificationResponse> SendVerificationCodeAsync(string phoneNumber)
        {
            try
            {
                // Generate 6-digit verification code
                var verificationCode = new Random().Next(100000, 999999).ToString();
                var sessionId = Guid.NewGuid().ToString();
                
                // Store verification code temporarily (in production, use Redis or database)
                _verificationCodes[sessionId] = verificationCode;
                
                // Send SMS using Twilio
                var message = await MessageResource.CreateAsync(
                    body: $"Your Parampara Foods verification code is: {verificationCode}. This code will expire in 10 minutes.",
                    from: new PhoneNumber(_configuration["Twilio:FromPhoneNumber"]),
                    to: new PhoneNumber(phoneNumber)
                );

                _logger.LogInformation($"Verification code sent to {phoneNumber}, Message SID: {message.Sid}");

                return new PhoneVerificationResponse
                {
                    Success = true,
                    Message = "Verification code sent successfully",
                    SessionId = sessionId
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send verification code to {phoneNumber}");
                return new PhoneVerificationResponse
                {
                    Success = false,
                    Message = "Failed to send verification code. Please try again."
                };
            }
        }

        public async Task<PhoneAuthResponse?> VerifyCodeAndAuthenticateAsync(PhoneAuthVerifyDto dto, string sessionId)
        {
            try
            {
                // Verify the code
                if (!_verificationCodes.TryGetValue(sessionId, out var storedCode) || 
                    storedCode != dto.VerificationCode)
                {
                    return null;
                }

                // Remove used code
                _verificationCodes.Remove(sessionId);

                // Find or create user
                var user = await _userManager.FindByNameAsync(dto.PhoneNumber);
                var isNewUser = false;

                if (user == null)
                {
                    // Create new user with phone number
                    user = new ApplicationUser
                    {
                        UserName = dto.PhoneNumber,
                        PhoneNumber = dto.PhoneNumber,
                        PhoneNumberConfirmed = true,
                        AuthProvider = "phone",
                        FullName = $"User {dto.PhoneNumber.Substring(dto.PhoneNumber.Length - 4)}", // Last 4 digits
                        Address = "Not provided",
                        CreatedAt = DateTime.UtcNow,
                        LastLoginAt = DateTime.UtcNow
                    };

                    var result = await _userManager.CreateAsync(user);
                    if (!result.Succeeded)
                    {
                        _logger.LogError($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                        return null;
                    }

                    // Assign default role
                    await _userManager.AddToRoleAsync(user, "User");
                    isNewUser = true;
                }
                else
                {
                    // Update last login
                    user.LastLoginAt = DateTime.UtcNow;
                    await _userManager.UpdateAsync(user);
                }

                // Generate JWT token
                var token = await GenerateJwtTokenAsync(user);

                return new PhoneAuthResponse
                {
                    Token = token,
                    Expiration = DateTime.UtcNow.AddDays(7).ToString("O"),
                    UserId = user.Id,
                    PhoneNumber = user.PhoneNumber ?? "",
                    FullName = user.FullName ?? "",
                    Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User",
                    AuthProvider = "phone",
                    IsNewUser = isNewUser
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to verify code for {dto.PhoneNumber}");
                return null;
            }
        }

        private async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User";

            var claims = new List<System.Security.Claims.Claim>
            {
                new(System.Security.Claims.ClaimTypes.NameIdentifier, user.Id),
                new(System.Security.Claims.ClaimTypes.Name, user.UserName ?? ""),
                new(System.Security.Claims.ClaimTypes.Email, user.Email ?? ""),
                new(System.Security.Claims.ClaimTypes.Role, role),
                new("auth_provider", user.AuthProvider ?? "local"),
                new("phone_number", user.PhoneNumber ?? "")
            };

            var key = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new Microsoft.IdentityModel.Tokens.SigningCredentials(key, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
