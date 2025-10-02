using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.Models;

namespace Parampara_Foods
{
    public static class UpdateSamplePrices
    {
        public static async Task UpdateAsync(ApplicationDbContext context)
        {
            // Convert some existing products to have sale prices
            var products = await context.FoodItems.ToListAsync();
            
            if (products.Any())
            {
                // Add sale prices to some products (convert existing Price to MRP and add SalePrice)
                var saleProducts = products.Take(5).ToList();
                
                foreach (var product in saleProducts)
                {
                    // Set MRP to current price + 20-30%
                    var currentPrice = product.MRP;
                    product.MRP = Math.Round(currentPrice * 1.25m, 2); // 25% markup for MRP
                    product.SalePrice = currentPrice; // Current price becomes sale price
                    
                    // Add some enhanced details
                    product.Brand = GetRandomBrand();
                    product.Unit = GetRandomUnit();
                    product.Quantity = GetRandomQuantity(product.Unit);
                    product.Tags = GetRandomTags(product.Name);
                    product.ViewCount = new Random().Next(10, 500);
                    product.Rating = Math.Round((decimal)(4.0 + new Random().NextDouble()), 1);
                    product.ReviewCount = new Random().Next(5, 100);
                    product.MinStockLevel = new Random().Next(5, 20);
                }
                
                // Update some products to have higher MRP without sale (premium products)
                var premiumProducts = products.Skip(5).Take(3).ToList();
                foreach (var product in premiumProducts)
                {
                    product.MRP = Math.Round(product.MRP * 1.5m, 2); // 50% higher MRP
                    product.SalePrice = null; // No sale price
                    
                    // Add premium details
                    product.Brand = "Premium " + GetRandomBrand();
                    product.Unit = GetRandomUnit();
                    product.Quantity = GetRandomQuantity(product.Unit);
                    product.Tags = "premium,organic," + GetRandomTags(product.Name);
                    product.ViewCount = new Random().Next(50, 200);
                    product.Rating = Math.Round((decimal)(4.5 + new Random().NextDouble() * 0.5), 1);
                    product.ReviewCount = new Random().Next(20, 80);
                    product.MinStockLevel = new Random().Next(3, 10);
                }
                
                await context.SaveChangesAsync();
                Console.WriteLine($"Updated {saleProducts.Count} products with sale prices and {premiumProducts.Count} premium products.");
            }
        }
        
        private static string GetRandomBrand()
        {
            var brands = new[] { "FreshFarm", "OrganicChoice", "NaturePure", "GreenHarvest", "PureLand", "EcoFresh" };
            return brands[new Random().Next(brands.Length)];
        }
        
        private static string GetRandomUnit()
        {
            var units = new[] { "kg", "grams", "pieces", "liters", "ml", "pack" };
            return units[new Random().Next(units.Length)];
        }
        
        private static decimal GetRandomQuantity(string unit)
        {
            return unit switch
            {
                "kg" => new Random().Next(1, 5),
                "grams" => new Random().Next(250, 1000),
                "pieces" => new Random().Next(1, 12),
                "liters" => new Random().Next(1, 3),
                "ml" => new Random().Next(250, 1000),
                "pack" => 1,
                _ => 1
            };
        }
        
        private static string GetRandomTags(string productName)
        {
            var baseTags = new[] { "fresh", "healthy", "natural", "nutritious", "local" };
            var selectedTags = baseTags.Take(new Random().Next(2, 4));
            return string.Join(",", selectedTags);
        }
    }
}

