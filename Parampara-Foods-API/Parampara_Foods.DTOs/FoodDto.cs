namespace Parampara_Foods.DTOs
{
    public class FoodDto
    {
        public int FoodId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        
        // Enhanced Pricing (in Indian Rupees ₹)
        public decimal MRP { get; set; }
        public decimal? SalePrice { get; set; }
        public decimal Price => SalePrice ?? MRP;
        public decimal? DiscountPercentage => SalePrice.HasValue && MRP > 0 ? 
            Math.Round(((MRP - SalePrice.Value) / MRP) * 100, 2) : null;
        public bool IsOnSale => SalePrice.HasValue && SalePrice < MRP;
        public decimal Savings => IsOnSale ? MRP - SalePrice!.Value : 0;
        
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
        public bool IsOrganic { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; } // Keep for backward compatibility
        public List<FoodImageDto> Images { get; set; } = new List<FoodImageDto>();
        
        // Additional Details
        public string? Brand { get; set; }
        public string? Unit { get; set; } = "kg";
        public decimal Quantity { get; set; } = 1;
        public string? Tags { get; set; }
        public int ViewCount { get; set; }
        public decimal Rating { get; set; } = 5.0m;
        public int ReviewCount { get; set; }
        public bool IsLowStock { get; set; }
    }

    public class CreateFoodDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal MRP { get; set; }
        public decimal? SalePrice { get; set; }
        public int CategoryId { get; set; }
        public bool IsOrganic { get; set; } = true;
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public string? Brand { get; set; }
        public string? Unit { get; set; } = "kg";
        public decimal Quantity { get; set; } = 1;
        public string? Tags { get; set; }
        public int MinStockLevel { get; set; } = 5;
    }

    public class UpdateFoodDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal MRP { get; set; }
        public decimal? SalePrice { get; set; }
        public int CategoryId { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsOrganic { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public string? Brand { get; set; }
        public string? Unit { get; set; }
        public decimal Quantity { get; set; }
        public string? Tags { get; set; }
        public int MinStockLevel { get; set; }
    }
}