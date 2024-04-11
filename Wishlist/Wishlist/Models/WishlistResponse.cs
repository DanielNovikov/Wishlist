using Wishlist.Data.Models;

namespace Wishlist.Wishlist.Models;

public record WishlistResponse(int Id, string Name, int UserId);

public static class WishlistResponseExtensions
{
    public static WishlistResponse ToResponse(this WishlistEntity wishlist)
    {
        return new WishlistResponse(wishlist.Id, wishlist.Name, wishlist.UserId);
    }
}