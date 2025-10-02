using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.Models;

namespace Parampara_Foods.Services
{
    public class DataSeedingService
    {
        private readonly ApplicationDbContext _context;

        public DataSeedingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedDataAsync()
        {
            // Check if data already exists
            if (await _context.Categories.AnyAsync() || await _context.FoodItems.AnyAsync())
            {
                Console.WriteLine("Database already contains data. Skipping seeding.");
                return;
            }

            Console.WriteLine("Starting database seeding...");

            // Seed Categories
            await SeedCategoriesAsync();
            
            // Seed Food Items
            await SeedFoodItemsAsync();

            Console.WriteLine("Database seeding completed successfully!");
        }

        private async Task SeedCategoriesAsync()
        {
            var categories = new List<FoodCategory>
            {
                new FoodCategory
                {
                    Name = "Vegetables",
                    Description = "Fresh organic vegetables grown without pesticides",
                    IsActive = true
                },
                new FoodCategory
                {
                    Name = "Fruits",
                    Description = "Seasonal organic fruits packed with nutrients",
                    IsActive = true
                },
                new FoodCategory
                {
                    Name = "Dairy",
                    Description = "Organic dairy products from grass-fed animals",
                    IsActive = true
                },
                new FoodCategory
                {
                    Name = "Grains",
                    Description = "Whole grains and cereals for healthy nutrition",
                    IsActive = true
                },
                new FoodCategory
                {
                    Name = "Herbs",
                    Description = "Fresh herbs and spices for natural flavoring",
                    IsActive = true
                },
                new FoodCategory
                {
                    Name = "Beverages",
                    Description = "Organic beverages and healthy drinks",
                    IsActive = true
                }
            };

            _context.Categories.AddRange(categories);
            await _context.SaveChangesAsync();
            Console.WriteLine($"Seeded {categories.Count} categories");
        }

        private async Task SeedFoodItemsAsync()
        {
            // Get category IDs
            var vegetables = await _context.Categories.FirstAsync(c => c.Name == "Vegetables");
            var fruits = await _context.Categories.FirstAsync(c => c.Name == "Fruits");
            var dairy = await _context.Categories.FirstAsync(c => c.Name == "Dairy");
            var grains = await _context.Categories.FirstAsync(c => c.Name == "Grains");
            var herbs = await _context.Categories.FirstAsync(c => c.Name == "Herbs");
            var beverages = await _context.Categories.FirstAsync(c => c.Name == "Beverages");

            var foodItems = new List<FoodItem>
            {
                // Vegetables
                new FoodItem
                {
                    Name = "Organic Tomatoes",
                    Description = "Fresh, juicy organic tomatoes perfect for salads and cooking. Grown without pesticides in rich, fertile soil.",
                    MRP = 89.99m,
                    SalePrice = 79.99m,
                    CategoryId = vegetables.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 50,
                    ImageUrl = "https://images.unsplash.com/photo-1546470427-e5e5c0c3d3a4?w=400&h=400&fit=crop",
                    Brand = "FreshFarm",
                    Unit = "kg",
                    Quantity = 1,
                    Tags = "fresh,healthy,organic",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 10
                },
                new FoodItem
                {
                    Name = "Fresh Spinach",
                    Description = "Nutrient-rich organic spinach leaves, perfect for salads, smoothies, and cooking. High in iron and vitamins.",
                    MRP = 69.99m,
                    SalePrice = 59.99m,
                    CategoryId = vegetables.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 30,
                    ImageUrl = "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
                    Brand = "EcoFresh",
                    Unit = "bunch",
                    Quantity = 1,
                    Tags = "leafy,green,iron,vitamins",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 5
                },
                new FoodItem
                {
                    Name = "Organic Carrots",
                    Description = "Sweet, crunchy organic carrots packed with beta-carotene. Great for snacking, cooking, and juicing.",
                    MRP = 59.99m,
                    SalePrice = 49.99m,
                    CategoryId = vegetables.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 40,
                    ImageUrl = "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=400&fit=crop",
                    Brand = "OrganicChoice",
                    Unit = "kg",
                    Quantity = 1,
                    Tags = "crunchy,beta-carotene,healthy",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 10
                },
                new FoodItem
                {
                    Name = "Bell Peppers Mix",
                    Description = "Colorful mix of red, yellow, and green organic bell peppers. Rich in vitamin C and perfect for stir-fries.",
                    MRP = 149.99m,
                    SalePrice = 129.99m,
                    CategoryId = vegetables.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 25,
                    ImageUrl = "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
                    Brand = "PureLand",
                    Unit = "pack",
                    Quantity = 500,
                    Tags = "colorful,vitamin-c,peppers",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 5
                },
                new FoodItem
                {
                    Name = "Organic Broccoli",
                    Description = "Fresh organic broccoli crowns, rich in vitamins and minerals. Perfect steamed, roasted, or in stir-fries.",
                    MRP = 99.99m,
                    SalePrice = 89.99m,
                    CategoryId = vegetables.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 20,
                    ImageUrl = "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop",
                    Brand = "GreenFarm",
                    Unit = "piece",
                    Quantity = 1,
                    Tags = "green,vitamins,healthy",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 5
                },

                // Fruits
                new FoodItem
                {
                    Name = "Organic Apples",
                    Description = "Crisp, sweet organic apples. A perfect healthy snack packed with fiber and natural sweetness.",
                    MRP = 199.99m,
                    SalePrice = 179.99m,
                    CategoryId = fruits.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 60,
                    ImageUrl = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
                    Brand = "FreshOrchard",
                    Unit = "kg",
                    Quantity = 1,
                    Tags = "crisp,sweet,fiber,healthy",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 10
                },
                new FoodItem
                {
                    Name = "Fresh Bananas",
                    Description = "Naturally sweet organic bananas, rich in potassium and perfect for smoothies, baking, or snacking.",
                    MRP = 69.99m,
                    SalePrice = 59.99m,
                    CategoryId = fruits.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 80,
                    ImageUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
                    Brand = "TropicalFresh",
                    Unit = "dozen",
                    Quantity = 12,
                    Tags = "sweet,potassium,energy",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 20
                },
                new FoodItem
                {
                    Name = "Organic Strawberries",
                    Description = "Sweet, juicy organic strawberries. Perfect for desserts, smoothies, or eating fresh. Rich in vitamin C.",
                    MRP = 299.99m,
                    SalePrice = 249.99m,
                    CategoryId = fruits.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 35,
                    ImageUrl = "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
                    Brand = "BerryFresh",
                    Unit = "pack",
                    Quantity = 250,
                    Tags = "sweet,vitamin-c,berries",
                    ViewCount = 0,
                    Rating = 0,
                    ReviewCount = 0,
                    MinStockLevel = 5
                },
                new FoodItem
                {
                    Name = "Fresh Oranges",
                    Description = "Juicy organic oranges bursting with vitamin C. Perfect for fresh juice or healthy snacking.",
                    MRP = 119.99m,
                    SalePrice = 99.99m,
                    CategoryId = fruits.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 45,
                    ImageUrl = "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Organic Blueberries",
                    Description = "Antioxidant-rich organic blueberries. Perfect for smoothies, baking, or as a healthy snack.",
                    MRP = 199.99m,
                    SalePrice = 179.99m,
                    CategoryId = fruits.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 25,
                    ImageUrl = "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop"
                },

                // Dairy
                new FoodItem
                {
                    Name = "Organic Whole Milk",
                    Description = "Fresh organic whole milk from grass-fed cows. Rich, creamy, and perfect for drinking or cooking.",
                    MRP = 119.99m,
                    SalePrice = 99.99m,
                    CategoryId = dairy.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 30,
                    ImageUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Organic Greek Yogurt",
                    Description = "Thick, creamy organic Greek yogurt with live cultures. High in protein and perfect for breakfast or snacks.",
                    MRP = 149.99m,
                    SalePrice = 129.99m,
                    CategoryId = dairy.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 40,
                    ImageUrl = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Organic Cheese Selection",
                    Description = "Artisanal organic cheese selection including cheddar, mozzarella, and goat cheese from local farms.",
                    MRP = 299.99m,
                    SalePrice = 259.99m,
                    CategoryId = dairy.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 20,
                    ImageUrl = "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Farm Fresh Eggs",
                    Description = "Free-range organic eggs from happy hens. Rich in protein and perfect for any meal of the day.",
                    MRP = 139.99m,
                    SalePrice = 119.99m,
                    CategoryId = dairy.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 50,
                    ImageUrl = "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop"
                },

                // Grains
                new FoodItem
                {
                    Name = "Organic Brown Rice",
                    Description = "Nutritious organic brown rice, rich in fiber and minerals. Perfect as a healthy side dish or base for meals.",
                    MRP = 89.99m,
                    SalePrice = 79.99m,
                    CategoryId = grains.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 35,
                    ImageUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Organic Quinoa",
                    Description = "Protein-rich organic quinoa, a complete protein source. Gluten-free and perfect for healthy meals.",
                    MRP = 179.99m,
                    SalePrice = 159.99m,
                    CategoryId = grains.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 25,
                    ImageUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Whole Wheat Bread",
                    Description = "Fresh organic whole wheat bread made with ancient grains. Perfect for sandwiches and toast.",
                    MRP = 109.99m,
                    SalePrice = 94.99m,
                    CategoryId = grains.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 30,
                    ImageUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop"
                },

                // Herbs
                new FoodItem
                {
                    Name = "Fresh Basil",
                    Description = "Aromatic organic basil leaves, perfect for Italian dishes, pesto, and fresh garnishes.",
                    MRP = 69.99m,
                    SalePrice = 59.99m,
                    CategoryId = herbs.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 20,
                    ImageUrl = "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Organic Rosemary",
                    Description = "Fresh organic rosemary sprigs with intense flavor. Perfect for roasting and Mediterranean dishes.",
                    MRP = 79.99m,
                    SalePrice = 69.99m,
                    CategoryId = herbs.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 15,
                    ImageUrl = "https://images.unsplash.com/photo-1515426954248-2df4c11837c4?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Fresh Cilantro",
                    Description = "Fresh organic cilantro with bright, citrusy flavor. Essential for Mexican, Asian, and Middle Eastern cuisine.",
                    MRP = 49.99m,
                    SalePrice = 39.99m,
                    CategoryId = herbs.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 25,
                    ImageUrl = "https://images.unsplash.com/photo-1583119022894-0b0c2d7e5e8a?w=400&h=400&fit=crop"
                },

                // Beverages
                new FoodItem
                {
                    Name = "Organic Green Tea",
                    Description = "Premium organic green tea leaves rich in antioxidants. Perfect for a healthy, energizing drink.",
                    MRP = 199.99m,
                    SalePrice = 179.99m,
                    CategoryId = beverages.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 40,
                    ImageUrl = "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Fresh Orange Juice",
                    Description = "Freshly squeezed organic orange juice with no added sugars. Pure, natural vitamin C boost.",
                    MRP = 159.99m,
                    SalePrice = 139.99m,
                    CategoryId = beverages.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 20,
                    ImageUrl = "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop"
                },
                new FoodItem
                {
                    Name = "Organic Herbal Tea Mix",
                    Description = "Soothing blend of organic herbs including chamomile, peppermint, and lemon balm. Perfect for relaxation.",
                    MRP = 169.99m,
                    SalePrice = 149.99m,
                    CategoryId = beverages.CategoryId,
                    IsAvailable = true,
                    IsOrganic = true,
                    StockQuantity = 30,
                    ImageUrl = "https://images.unsplash.com/photo-1597318378144-e8e3e4c6e4e4?w=400&h=400&fit=crop"
                }
            };

            _context.FoodItems.AddRange(foodItems);
            await _context.SaveChangesAsync();
            Console.WriteLine($"Seeded {foodItems.Count} food items");
        }
    }
}
