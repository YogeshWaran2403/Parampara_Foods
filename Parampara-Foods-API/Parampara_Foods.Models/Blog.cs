using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Parampara_Foods.Models
{
    public class Blog
    {
        [Key]
        public int BlogId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string AuthorId { get; set; } = string.Empty;

        [ForeignKey("AuthorId")]
        public virtual ApplicationUser Author { get; set; } = null!;

        public string? ImageUrl { get; set; }
        public bool IsPublished { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}