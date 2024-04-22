using Wishlist.Shared.Core.Utilities;
using Wishlist.Wishlist.Utilities;

namespace Wishlist.Wishlist.Models;

public record WishlistItemCreateRequest(string Title, string? Description, int? Price, string? Url, string? ImageSrc)
{
    public bool IsValid()
    {
        return WishlistValidationUtilities.IsTitleValid(Title) &&
               (string.IsNullOrEmpty(Description) || WishlistValidationUtilities.IsDescriptionValid(Description)) &&
               (string.IsNullOrEmpty(Url) || WishlistValidationUtilities.IsUrlValid(Url)) &&
               (string.IsNullOrEmpty(ImageSrc) || CoreValidationUtilities.IsPathValid(ImageSrc));
    }
}