using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.Models;

namespace Parampara_Foods
{
    public static class ComprehensiveSeedData
    {
        public static async Task SeedComprehensiveDataAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Console.WriteLine("Starting comprehensive data seeding...");

            // Get existing data
            var adminUser = await userManager.FindByEmailAsync("admin@paramparafoods.com");
            var categories = await context.Categories.ToListAsync();
            var foodItems = await context.FoodItems.ToListAsync();

            if (adminUser == null || !categories.Any() || !foodItems.Any())
            {
                Console.WriteLine("Basic data not found. Please run basic seeding first.");
                return;
            }

            // Create additional users
            await CreateAdditionalUsers(userManager);

            // Get all users
            var allUsers = await userManager.Users.ToListAsync();

            // Create sample orders
            await CreateSampleOrders(context, allUsers, foodItems);

            // Create sample feedback
            await CreateSampleFeedback(context, allUsers, foodItems);

            // Create sample blogs
            await CreateSampleBlogs(context, allUsers);

            Console.WriteLine("Comprehensive data seeding completed successfully!");
        }

        private static async Task CreateAdditionalUsers(UserManager<ApplicationUser> userManager)
        {
            var additionalUsers = new List<(string email, string password, string fullName, string address, string role)>
            {
                ("john.doe@example.com", "Password123!", "John Doe", "123 Main St, City, State 12345", "User"),
                ("jane.smith@example.com", "Password123!", "Jane Smith", "456 Oak Ave, City, State 12345", "User"),
                ("mike.johnson@example.com", "Password123!", "Mike Johnson", "789 Pine Rd, City, State 12345", "User"),
                ("sarah.wilson@example.com", "Password123!", "Sarah Wilson", "321 Elm St, City, State 12345", "User"),
                ("david.brown@example.com", "Password123!", "David Brown", "654 Maple Dr, City, State 12345", "User"),
                ("lisa.davis@example.com", "Password123!", "Lisa Davis", "987 Cedar Ln, City, State 12345", "User"),
                ("robert.miller@example.com", "Password123!", "Robert Miller", "147 Birch St, City, State 12345", "User"),
                ("emily.garcia@example.com", "Password123!", "Emily Garcia", "258 Spruce Ave, City, State 12345", "User")
            };

            foreach (var (email, password, fullName, address, role) in additionalUsers)
            {
                var existingUser = await userManager.FindByEmailAsync(email);
                if (existingUser == null)
                {
                    var user = new ApplicationUser
                    {
                        UserName = email,
                        Email = email,
                        FullName = fullName,
                        Address = address,
                        EmailConfirmed = true
                    };

                    var result = await userManager.CreateAsync(user, password);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, role);
                        Console.WriteLine($"Created user: {email}");
                    }
                }
            }
        }

        private static async Task CreateSampleOrders(ApplicationDbContext context, List<ApplicationUser> users, List<FoodItem> foodItems)
        {
            var existingOrders = await context.Orders.CountAsync();
            if (existingOrders > 0)
            {
                Console.WriteLine("Orders already exist. Skipping order creation.");
                return;
            }

            var random = new Random();
            var orderStatuses = new[] { "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled" };
            var addresses = new[]
            {
                "123 Main Street, Downtown, City 12345",
                "456 Oak Avenue, Midtown, City 12345",
                "789 Pine Road, Uptown, City 12345",
                "321 Elm Street, Suburb, City 12345",
                "654 Maple Drive, Westside, City 12345"
            };

            var orders = new List<Order>();

            // Create 20-30 sample orders
            for (int i = 0; i < 25; i++)
            {
                var user = users[random.Next(users.Count)];
                var orderDate = DateTime.UtcNow.AddDays(-random.Next(1, 90)); // Orders from last 90 days
                var status = orderStatuses[random.Next(orderStatuses.Length)];
                
                var order = new Order
                {
                    UserId = user.Id,
                    TotalAmount = 0, // Will be calculated
                    Status = status,
                    DeliveryAddress = addresses[random.Next(addresses.Length)],
                    CustomerNotes = random.Next(3) == 0 ? GetRandomCustomerNote() : null,
                    OrderDate = orderDate,
                    DeliveryDate = status == "Delivered" ? orderDate.AddDays(random.Next(1, 7)) : null
                };

                // Add 1-5 items per order
                var itemCount = random.Next(1, 6);
                var selectedItems = foodItems.OrderBy(x => random.Next()).Take(itemCount).ToList();
                
                foreach (var item in selectedItems)
                {
                    var quantity = random.Next(1, 5);
                    var orderItem = new OrderItem
                    {
                        FoodId = item.FoodId,
                        Quantity = quantity,
                        UnitPrice = item.SalePrice ?? item.MRP
                    };
                    order.OrderItems.Add(orderItem);
                    order.TotalAmount += orderItem.UnitPrice * orderItem.Quantity;
                }

                orders.Add(order);
            }

            context.Orders.AddRange(orders);
            await context.SaveChangesAsync();
            Console.WriteLine($"Created {orders.Count} sample orders");
        }

        private static async Task CreateSampleFeedback(ApplicationDbContext context, List<ApplicationUser> users, List<FoodItem> foodItems)
        {
            var existingFeedback = await context.Feedbacks.CountAsync();
            if (existingFeedback > 0)
            {
                Console.WriteLine("Feedback already exists. Skipping feedback creation.");
                return;
            }

            var random = new Random();
            var feedbackComments = new[]
            {
                "Excellent quality! Fresh and delicious.",
                "Great product, will definitely order again.",
                "Good value for money, satisfied with the purchase.",
                "Amazing taste and quality. Highly recommended!",
                "Fast delivery and fresh products.",
                "Love the organic options available.",
                "Good packaging and product arrived in perfect condition.",
                "Tasty and healthy, perfect for my family.",
                "Great customer service and quality products.",
                "Will be a regular customer from now on."
            };

            var feedbacks = new List<Feedback>();

            // Create 50-80 feedback entries
            for (int i = 0; i < 70; i++)
            {
                var user = users[random.Next(users.Count)];
                var foodItem = random.Next(3) == 0 ? foodItems[random.Next(foodItems.Count)] : null; // 1/3 chance for food-specific feedback
                var rating = random.Next(1, 6); // 1-5 stars
                var comment = random.Next(3) == 0 ? feedbackComments[random.Next(feedbackComments.Length)] : null; // 1/3 chance for comment

                var feedback = new Feedback
                {
                    UserId = user.Id,
                    Rating = rating,
                    Comment = comment,
                    FoodId = foodItem?.FoodId,
                    CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 60)) // Feedback from last 60 days
                };

                feedbacks.Add(feedback);
            }

            context.Feedbacks.AddRange(feedbacks);
            await context.SaveChangesAsync();
            Console.WriteLine($"Created {feedbacks.Count} sample feedback entries");
        }

        private static async Task CreateSampleBlogs(ApplicationDbContext context, List<ApplicationUser> users)
        {
            var existingBlogs = await context.Blogs.CountAsync();
            if (existingBlogs > 0)
            {
                Console.WriteLine("Blogs already exist. Skipping blog creation.");
                return;
            }

            var adminUser = users.FirstOrDefault(u => u.Email == "admin@paramparafoods.com");
            if (adminUser == null) return;

            var blogs = new List<Blog>
            {
                new Blog
                {
                    Title = "The Benefits of Organic Farming",
                    Content = @"Organic farming is more than just a trend – it's a sustainable approach to agriculture that benefits both our health and the environment. 

Organic farming practices focus on:
- Using natural fertilizers and pest control methods
- Maintaining soil health through crop rotation
- Preserving biodiversity
- Reducing chemical exposure

At Parampara Foods, we partner with local organic farmers who share our commitment to sustainable agriculture. Our organic products are grown without synthetic pesticides, herbicides, or genetically modified organisms.

The health benefits of organic food include:
- Higher nutrient content
- Reduced exposure to harmful chemicals
- Better taste and flavor
- Support for sustainable farming practices

When you choose organic, you're not just making a choice for your health – you're supporting farmers who care about the environment and future generations.",
                    AuthorId = adminUser.Id,
                    ImageUrl = "/images/blog/organic-farming.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-30)
                },
                new Blog
                {
                    Title = "Seasonal Eating: Why It Matters",
                    Content = @"Eating seasonally is one of the best ways to enjoy fresh, nutritious food while supporting local farmers and reducing your environmental footprint.

Benefits of seasonal eating:
- Peak nutrition and flavor
- Lower environmental impact
- Support for local farmers
- Cost-effective choices
- Connection to natural cycles

Spring brings fresh greens, asparagus, and strawberries. Summer offers tomatoes, corn, and berries. Fall provides apples, pumpkins, and root vegetables. Winter brings hearty greens, citrus, and stored crops.

Our seasonal produce selection changes throughout the year to bring you the freshest, most flavorful options available. We work closely with local farmers to ensure you get the best of each season.

Tips for seasonal eating:
- Visit local farmers markets
- Plan meals around seasonal ingredients
- Preserve seasonal abundance through canning or freezing
- Try new seasonal recipes
- Support community-supported agriculture (CSA) programs",
                    AuthorId = adminUser.Id,
                    ImageUrl = "/images/blog/seasonal-eating.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-25)
                },
                new Blog
                {
                    Title = "Farm-to-Table: Our Commitment to Freshness",
                    Content = @"At Parampara Foods, we believe that the shortest distance between farm and table is the best path to exceptional food quality and taste.

Our farm-to-table process:
1. Direct partnerships with local farms
2. Daily harvest and delivery coordination
3. Minimal processing and handling
4. Quick delivery to maintain freshness
5. Quality control at every step

We work with over 50 local farms within a 100-mile radius of our distribution center. This ensures that our products are as fresh as possible when they reach your table.

The benefits of our farm-to-table approach:
- Maximum freshness and flavor
- Reduced carbon footprint
- Support for local economy
- Transparency in sourcing
- Seasonal variety and diversity

Our farmers use sustainable practices including:
- Crop rotation for soil health
- Natural pest management
- Water conservation techniques
- Biodiversity preservation
- Organic certification standards

Every product in our store comes with a story – we know exactly which farm it came from, when it was harvested, and how it was grown. This transparency gives you confidence in the quality and safety of your food.",
                    AuthorId = adminUser.Id,
                    ImageUrl = "/images/blog/farm-to-table.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-20)
                },
                new Blog
                {
                    Title = "Healthy Meal Planning with Organic Ingredients",
                    Content = @"Meal planning with organic ingredients doesn't have to be complicated or expensive. With a little planning and creativity, you can create nutritious, delicious meals that support your health and the environment.

Meal planning tips:
- Plan meals around seasonal produce
- Batch cook on weekends
- Use versatile ingredients in multiple dishes
- Incorporate whole grains and legumes
- Include a variety of colors and textures

Sample weekly meal plan:
Monday: Quinoa salad with seasonal vegetables
Tuesday: Organic chicken with roasted root vegetables
Wednesday: Lentil soup with fresh bread
Thursday: Stir-fried vegetables with brown rice
Friday: Fish with steamed greens
Saturday: Homemade pizza with organic toppings
Sunday: Slow-cooked beans with seasonal sides

Storage tips for organic produce:
- Store leafy greens in damp paper towels
- Keep root vegetables in cool, dark places
- Refrigerate berries and stone fruits
- Store herbs in water like flowers
- Use produce within optimal timeframes

Budget-friendly organic shopping:
- Buy seasonal produce
- Choose whole foods over processed
- Buy in bulk when possible
- Grow your own herbs
- Join a CSA program

Remember, eating organic is an investment in your health and the planet. Start small and gradually increase your organic choices as your budget allows.",
                    AuthorId = adminUser.Id,
                    ImageUrl = "/images/blog/meal-planning.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-15)
                },
                new Blog
                {
                    Title = "Understanding Food Labels: Organic vs Natural",
                    Content = @"Navigating food labels can be confusing, especially when terms like 'organic' and 'natural' are used interchangeably. Understanding the difference helps you make informed choices about your food.

Organic Certification:
- Regulated by government standards
- Requires third-party certification
- Prohibits synthetic pesticides and fertilizers
- No genetically modified organisms (GMOs)
- Specific animal welfare standards
- Regular inspections and audits

Natural vs Organic:
- 'Natural' has no legal definition for food
- 'Organic' is strictly regulated and certified
- Natural products may still contain chemicals
- Organic products must meet strict standards
- Natural is often a marketing term
- Organic requires certification and verification

Reading organic labels:
- 100% Organic: All ingredients are organic
- Organic: At least 95% organic ingredients
- Made with Organic: At least 70% organic ingredients
- Specific organic ingredients: Less than 70% organic

Why choose certified organic:
- Guaranteed standards and practices
- Third-party verification
- Environmental benefits
- Health benefits
- Support for sustainable agriculture
- Transparency in production methods

At Parampara Foods, all our organic products are certified by recognized organic certification bodies. We believe in transparency and provide detailed information about our sourcing and certification processes.

Making informed choices:
- Look for organic certification seals
- Read ingredient lists carefully
- Understand the difference between terms
- Support companies with transparent practices
- Choose products that align with your values",
                    AuthorId = adminUser.Id,
                    ImageUrl = "/images/blog/food-labels.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-10)
                }
            };

            context.Blogs.AddRange(blogs);
            await context.SaveChangesAsync();
            Console.WriteLine($"Created {blogs.Count} sample blog posts");
        }

        private static string GetRandomCustomerNote()
        {
            var notes = new[]
            {
                "Please deliver after 5 PM",
                "Leave at front door if no answer",
                "Call when you arrive",
                "Ring doorbell twice",
                "Please handle with care",
                "Delivery instructions: Use side entrance"
            };
            return notes[new Random().Next(notes.Length)];
        }
    }
}

