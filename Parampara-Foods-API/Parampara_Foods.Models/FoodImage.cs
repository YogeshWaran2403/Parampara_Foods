using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Parampara_Foods.Models
{
    public class FoodImage
    {
        [Key]
        public int ImageId { get; set; }

        [Required]
        public int FoodId { get; set; }

        [ForeignKey("FoodId")]
        public virtual FoodItem FoodItem { get; set; } = null!;

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        [Required]
        public string AltText { get; set; } = string.Empty;

        public int DisplayOrder { get; set; } = 0; // For ordering images

        public bool IsPrimary { get; set; } = false; // Primary image flag

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
