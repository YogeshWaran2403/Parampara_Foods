namespace Parampara_Foods.DTOs
{
    public class FoodImageDto
    {
        public int ImageId { get; set; }
        public int FoodId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
        public bool IsPrimary { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateFoodImageDto
    {
        public int FoodId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public int DisplayOrder { get; set; } = 0;
        public bool IsPrimary { get; set; } = false;
    }

    public class UpdateFoodImageDto
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
        public bool IsPrimary { get; set; }
    }
}
