namespace Parampara_Foods.DTOs
{
    public class GoogleAuthDto
    {
        public string GoogleId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Picture { get; set; } = string.Empty;
    }

    public class GoogleAuthResponse
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

