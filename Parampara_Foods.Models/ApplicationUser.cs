using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Parampara_Foods.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public int? RoleId { get; set; }
        
        // Phone number authentication
        [Phone]
        public string? PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; } = false;
        
        // Google OAuth
        public string? GoogleId { get; set; }
        public string? GoogleEmail { get; set; }
        public string? GoogleName { get; set; }
        public string? GooglePicture { get; set; }
        
        // Authentication method tracking
        public string? AuthProvider { get; set; } // "local", "google", "phone"
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastLoginAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Role? Role { get; set; }
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();
        public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    }
}