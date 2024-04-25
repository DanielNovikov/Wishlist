using Wishlist.Data.Models;
using Wishlist.Wishlist.Models;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IWishlistItemService
{
    Task Create(WishlistItemCreateRequest request);
    
    Task Update(int id, WishlistItemUpdateRequest request);

    Task Delete(int id);

    Task<bool> Book(int id);
}