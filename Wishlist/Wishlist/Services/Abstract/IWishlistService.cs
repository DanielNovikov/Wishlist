using Wishlist.Data.Models;
using Wishlist.Wishlist.Models;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IWishlistService
{
    Task<WishlistResponse?> Get();

    Task<WishlistResponse> Create(WishlistCreateRequest request);
}