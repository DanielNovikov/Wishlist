using Wishlist.Wishlist.Models.Base;

namespace Wishlist.Wishlist.Models;

public record WishlistItemUpdateRequest(string Title, string? Description, int? Price, string? Url, string? ImageSrc) 
    : WishlistItemMutateRequest(Title, Description, Price, Url, ImageSrc);