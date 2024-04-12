using Wishlist.Wishlist.Models;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IWishlistItemScrapService
{
    Task<WishlistItemScrapResponse?> Scrap(WishlistItemScrapRequest request);
}