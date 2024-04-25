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
        var wishlist = await TryGetCurrent();
        if (wishlist != null) throw new InvalidOperationException();

        var currentUser = await currentUserService.Get();
        
        wishlist = new WishlistEntity
        {
            Name = request.Name,
            UserId = currentUser.Id
        };
        await wishlistRepository.Add(wishlist);

        return wishlist;
    }

    public async Task<WishlistEntity> Edit(int id, WishlistEditRequest request)
    {
        var wishlist = await GetCurrent();
        if (wishlist.Id != id) throw new InvalidOperationException();

        wishlist.Name = request.Name;
        await wishlistRepository.Update(wishlist);

        return wishlist;
    }
}