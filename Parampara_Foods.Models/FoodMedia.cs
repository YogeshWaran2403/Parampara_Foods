namespace Parampara_Foods.Models
{
    public class FoodMedia
    {
        public int Id { get; set; }
        public int FoodItemId { get; set; }
        public string MediaType { get; set; } = string.Empty; // Image, Video
        public string MediaUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public FoodItem FoodItem { get; set; } = null!;
    }
}