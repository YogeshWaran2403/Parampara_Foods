using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Parampara_Foods.Data;
using Parampara_Foods.Models;
using Parampara_Foods.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Google:ClientId"] ?? "";
    options.ClientSecret = builder.Configuration["Google:ClientSecret"] ?? "";
});

// Add CORS
builder.Services.AddCors(options =>
{
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://192.168.1.10:3000") // Frontend standard port + mobile access
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Add custom services
builder.Services.AddScoped<DataSeedingService>();
builder.Services.AddScoped<PhoneAuthService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Initialize roles and admin user
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

        // Ensure database is created
        context.Database.EnsureCreated();

        // Create roles
        string[] roleNames = { "Admin", "User" };
        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // Create test users
        var testUsers = new[]
        {
            new { Email = "admin@parampara.com", Password = "Admin123!", Role = "Admin", FullName = "Admin User" },
            new { Email = "user@parampara.com", Password = "User123!", Role = "User", FullName = "Test User" }
        };

        foreach (var userData in testUsers)
        {
            var existingUser = await userManager.FindByEmailAsync(userData.Email);
            if (existingUser == null)
            {
                var user = new ApplicationUser
                {
                    UserName = userData.Email,
                    Email = userData.Email,
                    FullName = userData.FullName,
                    Address = "123 Test Street, Test City",
                    AuthProvider = "local",
                    CreatedAt = DateTime.UtcNow,
                    LastLoginAt = DateTime.UtcNow,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(user, userData.Password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, userData.Role);
                    Console.WriteLine($"Created {userData.Role} user: {userData.Email}");
                }
                else
                {
                    Console.WriteLine($"Failed to create user {userData.Email}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                Console.WriteLine($"User {userData.Email} already exists.");
            }
        }

        // Seed sample data using DataSeedingService
        var seedingService = services.GetRequiredService<DataSeedingService>();
        await seedingService.SeedDataAsync();
        
        // Update sample prices with enhanced pricing system
        await Parampara_Foods.UpdateSamplePrices.UpdateAsync(context);
        
        // Seed comprehensive data (orders, feedback, blogs, additional users)
        await Parampara_Foods.ComprehensiveSeedData.SeedComprehensiveDataAsync(context, userManager);
        
        // Seed food images
        await Parampara_Foods.SeedFoodImages.SeedAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// Serve static files (images)
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();