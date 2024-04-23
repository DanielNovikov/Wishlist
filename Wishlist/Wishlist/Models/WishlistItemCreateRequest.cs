using Wishlist.Shared.Core.Utilities;
using Wishlist.Wishlist.Models.Base;
using Wishlist.Wishlist.Utilities;

namespace Wishlist.Wishlist.Models;

public record WishlistItemCreateRequest(string Title, string? Description, int? Price, string? Url, string? ImageSrc) 
    : WishlistItemMutateRequest(Title, Description, Price, Url, ImageSrc);