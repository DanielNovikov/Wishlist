using Wishlist.Wishlist.Utilities;

namespace Wishlist.Wishlist.Models.Base;

public record WishlistMutateRequest(string Name)
{
    public bool IsValid()
    {
        return WishlistValidationUtilities.IsNameValid(Name);
    }
}