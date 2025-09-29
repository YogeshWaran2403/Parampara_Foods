using System.ComponentModel.DataAnnotations;

namespace Parampara_Foods.Models
{
    public class FoodCategory
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public virtual ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
    }
}