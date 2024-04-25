using Wishlist.Wishlist.Models.Base;
using Wishlist.Wishlist.Utilities;

namespace Wishlist.Wishlist.Models;

public record WishlistCreateRequest(string Name) : WishlistMutateRequest(Name);