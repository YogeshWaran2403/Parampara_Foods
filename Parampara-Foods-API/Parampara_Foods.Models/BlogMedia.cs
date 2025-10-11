namespace Parampara_Foods.Models
{
    public class BlogMedia
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public string MediaType { get; set; } = string.Empty; // Image, Video, URL
        public string MediaUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Blog Blog { get; set; } = null!;
    }
}