using Wishlist.Wishlist.Models;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IWishlistService
{
    Task<WishlistResponse?> Get();
    
    Task<WishlistResponse?> GetById(int id);

    Task<WishlistResponse> Create(WishlistCreateRequest request);
}