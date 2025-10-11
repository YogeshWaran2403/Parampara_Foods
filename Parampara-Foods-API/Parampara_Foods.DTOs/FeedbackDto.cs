namespace Parampara_Foods.DTOs
{
    public class FeedbackDto
    {
        public int FeedbackId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? FoodId { get; set; }
    }

    public class CreateFeedbackDto
    {
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public int? FoodId { get; set; }
    }
}