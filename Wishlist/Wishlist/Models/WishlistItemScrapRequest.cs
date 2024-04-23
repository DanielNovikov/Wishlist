using Wishlist.Shared.Core.Utilities;

namespace Wishlist.Wishlist.Models;

public record WishlistItemScrapRequest(string Url)
{
    public bool IsValid()
    {
        return CoreValidationUtilities.IsUrlValid(Url);
    }
}