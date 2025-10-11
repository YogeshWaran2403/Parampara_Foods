using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parampara_Foods.Data;
using Parampara_Foods.DTOs;
using Parampara_Foods.Models;
using System.Security.Claims;

namespace Parampara_Foods.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("Admin");

            var query = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.FoodItem)
                .AsQueryable();

            if (!isAdmin)
            {
                query = query.Where(o => o.UserId == userId);
            }

            var orders = await query
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    UserId = o.UserId,
                    UserName = o.User.FullName ?? o.User.Email!,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    DeliveryAddress = o.DeliveryAddress,
                    CustomerNotes = o.CustomerNotes,
                    OrderDate = o.OrderDate,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                    {
                        FoodId = oi.FoodId,
                        FoodName = oi.FoodItem.Name,
                        Quantity = oi.Quantity,
                        UnitPrice = oi.UnitPrice
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("Admin");

            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.FoodItem)
                .Where(o => o.OrderId == id && (isAdmin || o.UserId == userId))
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    UserId = o.UserId,
                    UserName = o.User.FullName ?? o.User.Email!,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status,
                    DeliveryAddress = o.DeliveryAddress,
                    CustomerNotes = o.CustomerNotes,
                    OrderDate = o.OrderDate,
                    OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                    {
                        FoodId = oi.FoodId,
                        FoodName = oi.FoodItem.Name,
                        Quantity = oi.Quantity,
                        UnitPrice = oi.UnitPrice
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (order == null)
                return NotFound();

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized();

            // Validate food items and calculate total
            decimal totalAmount = 0;
            var orderItems = new List<OrderItem>();

            foreach (var item in dto.OrderItems)
            {
                var foodItem = await _context.FoodItems
                    .Where(f => f.FoodId == item.FoodId && f.IsAvailable && f.StockQuantity >= item.Quantity)
                    .FirstOrDefaultAsync();

                if (foodItem == null)
                    return BadRequest($"Food item with ID {item.FoodId} is not available or insufficient stock");

                totalAmount += foodItem.Price * item.Quantity;

                orderItems.Add(new OrderItem
                {
                    FoodId = item.FoodId,
                    Quantity = item.Quantity,
                    UnitPrice = foodItem.Price
                });

                // Update stock
                foodItem.StockQuantity -= item.Quantity;
            }

            var order = new Order
            {
                UserId = userId,
                TotalAmount = totalAmount,
                Status = "Pending",
                DeliveryAddress = dto.DeliveryAddress,
                CustomerNotes = dto.CustomerNotes,
                OrderItems = orderItems
            };

            // Add initial status history
            order.StatusHistory.Add(new DeliveryStatusHistory
            {
                Status = "Pending",
                Notes = "Order placed successfully"
            });

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var orderDto = new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                UserName = user.FullName ?? user.Email!,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                DeliveryAddress = order.DeliveryAddress,
                CustomerNotes = order.CustomerNotes,
                OrderDate = order.OrderDate,
                OrderItems = orderItems.Select(oi => new OrderItemDto
                {
                    FoodId = oi.FoodId,
                    FoodName = _context.FoodItems.Find(oi.FoodId)?.Name ?? "Unknown",
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice
                }).ToList()
            };

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, orderDto);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrderStatus(int id, OrderStatusUpdateDto dto)
        {
            var order = await _context.Orders
                .Include(o => o.StatusHistory)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
                return NotFound();

            order.Status = dto.Status;

            // Add status history
            order.StatusHistory.Add(new DeliveryStatusHistory
            {
                Status = dto.Status,
                Notes = dto.Notes,
                ChangedAt = DateTime.UtcNow
            });

            // If delivered, set delivery date
            if (dto.Status == "Delivered")
            {
                order.DeliveryDate = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}