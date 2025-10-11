namespace Parampara_Foods.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string DeliveryAddress { get; set; } = string.Empty;
        public string? CustomerNotes { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }

    public class OrderItemDto
    {
        public int FoodId { get; set; }
        public string FoodName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class CreateOrderDto
    {
        public string DeliveryAddress { get; set; } = string.Empty;
        public string? CustomerNotes { get; set; }
        public List<OrderItemCreateDto> OrderItems { get; set; } = new List<OrderItemCreateDto>();
    }

    public class OrderItemCreateDto
    {
        public int FoodId { get; set; }
        public int Quantity { get; set; }
    }

}