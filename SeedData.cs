using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.Models;

namespace Parampara_Foods
{
    public static class SeedData
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // Check if data already exists
            if (await context.Categories.AnyAsync() || await context.FoodItems.AnyAsync())
            {
                Console.WriteLine("Database already contains data. Skipping seeding.");
                return;
            }

            Console.WriteLine("Starting database seeding...");

            // Seed Categories
            var categories = new List<FoodCategory>
            {
                new FoodCategory { Name = "Vegetables", Description = "Fresh organic vegetables grown without pesticides", IsActive = true },
                new FoodCategory { Name = "Fruits", Description = "Seasonal organic fruits packed with nutrients", IsActive = true },
                new FoodCategory { Name = "Dairy", Description = "Organic dairy products from grass-fed animals", IsActive = true },
                new FoodCategory { Name = "Grains", Description = "Whole grains and cereals for healthy nutrition", IsActive = true },
                new FoodCategory { Name = "Herbs", Description = "Fresh herbs and spices for natural flavoring", IsActive = true },
                new FoodCategory { Name = "Beverages", Description = "Organic beverages and healthy drinks", IsActive = true }
            };

            context.Categories.AddRange(categories);
            await context.SaveChangesAsync();
            Console.WriteLine($"Seeded {categories.Count} categories");

            // Get category IDs
            var vegetables = await context.Categories.FirstAsync(c => c.Name == "Vegetables");
            var fruits = await context.Categories.FirstAsync(c => c.Name == "Fruits");
            var dairy = await context.Categories.FirstAsync(c => c.Name == "Dairy");
            var grains = await context.Categories.FirstAsync(c => c.Name == "Grains");
            var herbs = await context.Categories.FirstAsync(c => c.Name == "Herbs");
            var beverages = await context.Categories.FirstAsync(c => c.Name == "Beverages");

            // Seed Food Items
            var foodItems = new List<FoodItem>
            {
                // Vegetables
                new FoodItem { Name = "Organic Tomatoes", Description = "Fresh, juicy organic tomatoes perfect for salads and cooking. Grown without pesticides in rich, fertile soil.", MRP = 4.99m, CategoryId = vegetables.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 50, ImageUrl = "/images/products/tomatoes.jpg" },
                new FoodItem { Name = "Fresh Spinach", Description = "Nutrient-rich organic spinach leaves, perfect for salads, smoothies, and cooking. High in iron and vitamins.", MRP = 3.49m, CategoryId = vegetables.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 30, ImageUrl = "/images/products/spinach.jpg" },
                new FoodItem { Name = "Organic Carrots", Description = "Sweet, crunchy organic carrots packed with beta-carotene. Great for snacking, cooking, and juicing.", MRP = 2.99m, CategoryId = vegetables.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 40, ImageUrl = "/images/products/carrots.jpg" },
                new FoodItem { Name = "Bell Peppers Mix", Description = "Colorful mix of red, yellow, and green organic bell peppers. Rich in vitamin C and perfect for stir-fries.", MRP = 5.99m, CategoryId = vegetables.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 25, ImageUrl = "/images/products/bell-peppers.jpg" },
                new FoodItem { Name = "Organic Broccoli", Description = "Fresh organic broccoli crowns, rich in vitamins and minerals. Perfect steamed, roasted, or in stir-fries.", MRP = 4.49m, CategoryId = vegetables.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 20, ImageUrl = "/images/products/broccoli.jpg" },

                // Fruits
                new FoodItem { Name = "Organic Apples", Description = "Crisp, sweet organic apples. A perfect healthy snack packed with fiber and natural sweetness.", MRP = 5.99m, CategoryId = fruits.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 60, ImageUrl = "/images/products/apples.jpg" },
                new FoodItem { Name = "Fresh Bananas", Description = "Naturally sweet organic bananas, rich in potassium and perfect for smoothies, baking, or snacking.", MRP = 2.49m, CategoryId = fruits.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 80, ImageUrl = "/images/products/bananas.jpg" },
                new FoodItem { Name = "Organic Strawberries", Description = "Sweet, juicy organic strawberries. Perfect for desserts, smoothies, or eating fresh. Rich in vitamin C.", MRP = 6.99m, CategoryId = fruits.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 35, ImageUrl = "/images/products/strawberries.jpg" },
                new FoodItem { Name = "Fresh Oranges", Description = "Juicy organic oranges bursting with vitamin C. Perfect for fresh juice or healthy snacking.", MRP = 4.99m, CategoryId = fruits.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 45, ImageUrl = "/images/products/oranges.jpg" },
                new FoodItem { Name = "Organic Blueberries", Description = "Antioxidant-rich organic blueberries. Perfect for smoothies, baking, or as a healthy snack.", MRP = 8.99m, CategoryId = fruits.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 25, ImageUrl = "/images/products/blueberries.jpg" },

                // Dairy
                new FoodItem { Name = "Organic Whole Milk", Description = "Fresh organic whole milk from grass-fed cows. Rich, creamy, and perfect for drinking or cooking.", MRP = 4.99m, CategoryId = dairy.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 30, ImageUrl = "/images/products/milk.jpg" },
                new FoodItem { Name = "Organic Greek Yogurt", Description = "Thick, creamy organic Greek yogurt with live cultures. High in protein and perfect for breakfast or snacks.", MRP = 6.49m, CategoryId = dairy.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 40, ImageUrl = "/images/products/yogurt.jpg" },
                new FoodItem { Name = "Organic Cheese Selection", Description = "Artisanal organic cheese selection including cheddar, mozzarella, and goat cheese from local farms.", MRP = 12.99m, CategoryId = dairy.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 20, ImageUrl = "/images/products/cheese.jpg" },
                new FoodItem { Name = "Farm Fresh Eggs", Description = "Free-range organic eggs from happy hens. Rich in protein and perfect for any meal of the day.", MRP = 5.99m, CategoryId = dairy.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 50, ImageUrl = "/images/products/eggs.jpg" },

                // Grains
                new FoodItem { Name = "Organic Brown Rice", Description = "Nutritious organic brown rice, rich in fiber and minerals. Perfect as a healthy side dish or base for meals.", MRP = 3.99m, CategoryId = grains.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 35, ImageUrl = "/images/products/rice.jpg" },
                new FoodItem { Name = "Organic Quinoa", Description = "Protein-rich organic quinoa, a complete protein source. Gluten-free and perfect for healthy meals.", MRP = 7.99m, CategoryId = grains.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 25, ImageUrl = "/images/products/quinoa.jpg" },
                new FoodItem { Name = "Whole Wheat Bread", Description = "Fresh organic whole wheat bread made with ancient grains. Perfect for sandwiches and toast.", MRP = 4.49m, CategoryId = grains.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 30, ImageUrl = "/images/products/bread.jpg" },

                // Herbs
                new FoodItem { Name = "Fresh Basil", Description = "Aromatic organic basil leaves, perfect for Italian dishes, pesto, and fresh garnishes.", MRP = 2.99m, CategoryId = herbs.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 20, ImageUrl = "/images/products/basil.jpg" },
                new FoodItem { Name = "Organic Rosemary", Description = "Fresh organic rosemary sprigs with intense flavor. Perfect for roasting and Mediterranean dishes.", MRP = 3.49m, CategoryId = herbs.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 15, ImageUrl = "/images/products/basil.jpg" },
                new FoodItem { Name = "Fresh Cilantro", Description = "Fresh organic cilantro with bright, citrusy flavor. Essential for Mexican, Asian, and Middle Eastern cuisine.", MRP = 1.99m, CategoryId = herbs.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 25, ImageUrl = "/images/products/basil.jpg" },

                // Beverages
                new FoodItem { Name = "Organic Green Tea", Description = "Premium organic green tea leaves rich in antioxidants. Perfect for a healthy, energizing drink.", MRP = 8.99m, CategoryId = beverages.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 40, ImageUrl = "/images/products/green-tea.jpg" },
                new FoodItem { Name = "Fresh Orange Juice", Description = "Freshly squeezed organic orange juice with no added sugars. Pure, natural vitamin C boost.", MRP = 6.99m, CategoryId = beverages.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 20, ImageUrl = "/images/products/orange-juice.jpg" },
                new FoodItem { Name = "Organic Herbal Tea Mix", Description = "Soothing blend of organic herbs including chamomile, peppermint, and lemon balm. Perfect for relaxation.", MRP = 7.49m, CategoryId = beverages.CategoryId, IsAvailable = true, IsOrganic = true, StockQuantity = 30, ImageUrl = "/images/products/green-tea.jpg" }
            };

            context.FoodItems.AddRange(foodItems);
            await context.SaveChangesAsync();
            Console.WriteLine($"Seeded {foodItems.Count} food items");
            Console.WriteLine("Database seeding completed successfully!");
        }
    }
}
