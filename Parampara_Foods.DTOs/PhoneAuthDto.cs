namespace Parampara_Foods.DTOs
{
    public class PhoneAuthRequestDto
    {
        public string PhoneNumber { get; set; } = string.Empty;
    }

    public class PhoneAuthVerifyDto
    {
        public string PhoneNumber { get; set; } = string.Empty;
        public string VerificationCode { get; set; } = string.Empty;
    }

    public class PhoneAuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Expiration { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string AuthProvider { get; set; } = string.Empty;
        public bool IsNewUser { get; set; }
    }

    public class PhoneVerificationResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string SessionId { get; set; } = string.Empty;
    }
}

