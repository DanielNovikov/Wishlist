using Wishlist.Data.Models;

namespace Wishlist.Wishlist.Models;

public record WishlistItemResponse(int Id, string Title, string? Description, int? Price, string? Url, string? ImageSrc);


public static class WishlistItemResponseExtensions
{
    public static WishlistItemResponse ToResponse(this WishlistItemEntity entity)
    {
        return new WishlistItemResponse(entity.Id, entity.Title, entity.Description, entity.Price, entity.Url, entity.Image?.Path);
    }
}