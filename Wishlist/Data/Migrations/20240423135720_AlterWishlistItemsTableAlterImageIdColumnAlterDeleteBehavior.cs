using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wishlist.Data.Migrations
{
    /// <inheritdoc />
    public partial class AlterWishlistItemsTableAlterImageIdColumnAlterDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItems_Images_ImageId",
                table: "WishlistItems");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItems_Images_ImageId",
                table: "WishlistItems",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItems_Images_ImageId",
                table: "WishlistItems");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItems_Images_ImageId",
                table: "WishlistItems",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }
    }
}
