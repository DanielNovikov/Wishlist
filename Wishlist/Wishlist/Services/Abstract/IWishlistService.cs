using Wishlist.Data.Models;
using Wishlist.Wishlist.Models;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IWishlistService
{
    Task<WishlistEntity?> TryGetCurrent();
    
    Task<WishlistEntity> GetCurrent();
    
    Task<WishlistEntity?> GetByPublicId(string publicId);
    
    Task<List<WishlistItemEntity>> GetItemsByPublicId(string publicId);

    Task<WishlistEntity> Create(WishlistCreateRequest request);
    
    Task<WishlistEntity> Edit(string publicId, WishlistEditRequest request);
}