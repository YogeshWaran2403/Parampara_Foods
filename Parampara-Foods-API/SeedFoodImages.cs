using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.Models;

namespace Parampara_Foods
{
    public static class SeedFoodImages
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // Check if food images already exist
            if (await context.FoodImages.AnyAsync())
            {
                Console.WriteLine("Food images already exist. Skipping image seeding.");
                return;
            }

            Console.WriteLine("Starting food images seeding...");

            // Get all food items
            var foodItems = await context.FoodItems.ToListAsync();
            
            if (!foodItems.Any())
            {
                Console.WriteLine("No food items found. Please seed food items first.");
                return;
            }

            var foodImages = new List<FoodImage>();

            foreach (var food in foodItems)
            {
                // Create multiple images for each food item
                var images = GenerateImagesForFood(food);
                foodImages.AddRange(images);
            }

            context.FoodImages.AddRange(foodImages);
            await context.SaveChangesAsync();
            
            Console.WriteLine($"Seeded {foodImages.Count} food images for {foodItems.Count} food items");
        }

        private static List<FoodImage> GenerateImagesForFood(FoodItem food)
        {
            var images = new List<FoodImage>();
            var baseImageUrl = food.ImageUrl ?? "/images/products/default.jpg";
            
            // Generate 3-5 images per food item
            var imageCount = new Random().Next(3, 6);
            
            for (int i = 0; i < imageCount; i++)
            {
                var imageUrl = GenerateImageUrl(food.Name, i, baseImageUrl);
                
                images.Add(new FoodImage
                {
                    FoodId = food.FoodId,
                    ImageUrl = imageUrl,
                    AltText = $"{food.Name} - Image {i + 1}",
                    DisplayOrder = i,
                    IsPrimary = i == 0, // First image is primary
                    CreatedAt = DateTime.UtcNow
                });
            }

            return images;
        }

        private static string GenerateImageUrl(string foodName, int index, string baseUrl)
        {
            // Generate different image URLs based on food name and index
            var foodKey = foodName.ToLower().Replace(" ", "-").Replace("organic", "").Trim();
            
            return index switch
            {
                0 => baseUrl, // Keep original image as first
                1 => $"/images/products/{foodKey}-2.jpg",
                2 => $"/images/products/{foodKey}-3.jpg",
                3 => $"/images/products/{foodKey}-4.jpg",
                4 => $"/images/products/{foodKey}-5.jpg",
                _ => $"/images/products/{foodKey}-{index + 1}.jpg"
            };
        }
    }
}
