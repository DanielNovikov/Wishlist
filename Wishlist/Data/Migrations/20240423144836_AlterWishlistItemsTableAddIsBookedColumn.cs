using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wishlist.Data.Migrations
{
    /// <inheritdoc />
    public partial class AlterWishlistItemsTableAddIsBookedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsBooked",
                table: "WishlistItems",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBooked",
                table: "WishlistItems");
        }
    }
}
