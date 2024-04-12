using Wishlist.Wishlist.Utilities;

namespace Wishlist.Wishlist.Models;

public record WishlistItemScrapRequest(string Url)
{
    public bool IsValid()
    {
        return WishlistValidationUtilities.IsUrlValid(Url);
    }
}