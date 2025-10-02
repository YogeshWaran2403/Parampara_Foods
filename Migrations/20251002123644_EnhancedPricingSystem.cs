using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Parampara_Foods.Migrations
{
    /// <inheritdoc />
    public partial class EnhancedPricingSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "FoodItems",
                newName: "Rating");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "FoodItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MRP",
                table: "FoodItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "MinStockLevel",
                table: "FoodItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Quantity",
                table: "FoodItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "ReviewCount",
                table: "FoodItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "SalePrice",
                table: "FoodItems",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "FoodItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "FoodItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "FoodItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "FoodItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Brand",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "MRP",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "MinStockLevel",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "ReviewCount",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "SalePrice",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "FoodItems");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "FoodItems",
                newName: "Price");
        }
    }
}
