using Wishlist.Data.Models;

namespace Wishlist.Wishlist.Models;

public record WishlistResponse(string Name);

public static class WishlistResponseExtensions
{
    public static WishlistResponse ToResponse(this WishlistEntity wishlist)
    {
        return new WishlistResponse(wishlist.Name);
    }
}