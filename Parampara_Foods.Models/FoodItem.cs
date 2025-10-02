using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Parampara_Foods.Models
{
    public class FoodItem
    {
        [Key]
        public int FoodId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        // Enhanced Pricing System (in Indian Rupees ₹)
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MRP { get; set; } // Maximum Retail Price

        [Column(TypeName = "decimal(18,2)")]
        public decimal? SalePrice { get; set; } // Sale Price (if on sale)

        // Computed property for current selling price (not stored in DB)
        [NotMapped]
        public decimal Price => SalePrice ?? MRP;

        [NotMapped]
        public decimal? DiscountPercentage => SalePrice.HasValue ? 
            Math.Round(((MRP - SalePrice.Value) / MRP) * 100, 2) : null;

        [NotMapped]
        public bool IsOnSale => SalePrice.HasValue && SalePrice < MRP;

        [Required]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual FoodCategory Category { get; set; } = null!;

        public bool IsAvailable { get; set; } = true;
        public bool IsOrganic { get; set; } = true;
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        
        // Additional product details
        public string? Brand { get; set; }
        public string? Unit { get; set; } = "kg"; // kg, grams, pieces, liters, etc.
        public decimal Quantity { get; set; } = 1; // 1 kg, 500 grams, etc.
        
        // SEO and Marketing
        public string? Tags { get; set; } // Comma-separated tags
        public int ViewCount { get; set; } = 0;
        public decimal Rating { get; set; } = 5.0m;
        public int ReviewCount { get; set; } = 0;

        // Inventory Management
        public int MinStockLevel { get; set; } = 5;
        
        [NotMapped]
        public bool IsLowStock => StockQuantity <= MinStockLevel;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}