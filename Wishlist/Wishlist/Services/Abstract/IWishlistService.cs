using Wishlist.Data.Models;
using Wishlist.Wishlist.Models;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IWishlistService
{
    Task<WishlistEntity?> TryGetCurrent();
    
    Task<WishlistEntity> GetCurrent();
    
    Task<WishlistEntity?> GetById(int id);
    
    Task<List<WishlistItemEntity>> GetItemsById(int id);

    Task<WishlistEntity> Create(WishlistCreateRequest request);
    
    Task<WishlistEntity> Edit(int id, WishlistEditRequest request);
}