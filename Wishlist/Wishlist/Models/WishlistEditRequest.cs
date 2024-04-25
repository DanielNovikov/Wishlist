using Wishlist.Wishlist.Models.Base;

namespace Wishlist.Wishlist.Models;

public record WishlistEditRequest(string Name) : WishlistMutateRequest(Name);