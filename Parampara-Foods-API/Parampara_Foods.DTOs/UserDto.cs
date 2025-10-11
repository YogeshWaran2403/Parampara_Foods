namespace Parampara_Foods.DTOs
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string Role { get; set; } = string.Empty; // For backward compatibility
    }

    public class UpdateUserRoleDto
    {
        public int? RoleId { get; set; }
        public string Role { get; set; } = string.Empty; // For backward compatibility
    }

    public class CreateUserDto
    {
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int? RoleId { get; set; }
        public string Role { get; set; } = "User"; // For backward compatibility
    }
}
