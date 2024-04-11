using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.CurrentUser.Services.Abstract;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class WishlistService(
    ICurrentUserService currentUserService,
    IRepository<WishlistEntity> wishlistRepository)
    : IWishlistService
{
    public async Task<WishlistResponse?> Get()
    {
        var currentUser = await currentUserService.Get();
        if (currentUser == null) return null;

        var wishlist = await wishlistRepository.Query(query => query
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id));

        return wishlist?.ToResponse();
    }

    public async Task<WishlistResponse?> GetById(int id)
    {
        var wishlist = await wishlistRepository.Query(query => query
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.Id == id));

        return wishlist?.ToResponse();
    }

    public async Task<WishlistResponse> Create(WishlistCreateRequest request)
    {
        var currentUser = await currentUserService.Get();
        if (currentUser == null) throw new InvalidOperationException();
        
        var wishlist = await wishlistRepository.Query(query => query
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id));

        if (wishlist != null) throw new InvalidOperationException();

        wishlist = new WishlistEntity
        {
            Name = request.Name,
            UserId = currentUser.Id
        };
        await wishlistRepository.Add(wishlist);

        return wishlist.ToResponse();
    }
}