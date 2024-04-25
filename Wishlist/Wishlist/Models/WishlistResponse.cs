using Wishlist.Data.Models;

namespace Wishlist.Wishlist.Models;

public record WishlistResponse(string PublicId, string Name, int UserId);

public static class WishlistResponseExtensions
{
    public static WishlistResponse ToResponse(this WishlistEntity wishlist)
    {
        return new WishlistResponse(wishlist.PublicId, wishlist.Name, wishlist.UserId);
    }
}