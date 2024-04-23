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
    public async Task<WishlistEntity?> TryGetCurrent()
    {
        var currentUser = await currentUserService.TryGet();
        if (currentUser == null) return null;

        return await wishlistRepository.Query(query => query
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id));
    }

    public async Task<WishlistEntity> GetCurrent()
    {
        return await TryGetCurrent() ?? throw new InvalidOperationException("Wishlist couldn't be found");
    }

    public async Task<WishlistEntity?> GetById(int id)
    {
        return await wishlistRepository.Query(query => query
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.Id == id));
    }

    public async Task<List<WishlistItemEntity>> GetItemsById(int id)
    {
        return await wishlistRepository.Query(query => query
            .Include(x => x.Items)
            .ThenInclude(x => x.Image)
            .Where(x => x.Id == id)
            .SelectMany(x => x.Items)
            .OrderBy(x => x.Created)
            .ToListAsync());
    }

    public async Task<WishlistEntity> Create(WishlistCreateRequest request)
    {
        var currentUser = await currentUserService.Get();
        
        var wishlist = await wishlistRepository.Query(query => query
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id));

        if (wishlist != null) throw new InvalidOperationException();

        wishlist = new WishlistEntity
        {
            Name = request.Name,
            UserId = currentUser.Id
        };
        await wishlistRepository.Add(wishlist);

        return wishlist;
    }
}