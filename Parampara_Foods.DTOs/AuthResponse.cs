namespace Parampara_Foods.DTOs
{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Expiration { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string AuthProvider { get; set; } = string.Empty;
    }
}




