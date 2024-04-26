using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.CurrentUser.Services.Abstract;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class WishlistService(
    ICurrentUserService currentUserService,
    IRepository<WishlistEntity> repository,
    IWishlistPublicIdGenerator publicIdGenerator,
    ILogger<WishlistService> logger)
    : IWishlistService
{
    public async Task<WishlistEntity?> TryGetCurrent()
    {
        var currentUser = await currentUserService.TryGet();
        if (currentUser == null) return null;

        return await repository.Query(query => query
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.UserId == currentUser.Id));
    }

    public async Task<WishlistEntity> GetCurrent()
    {
        return await TryGetCurrent() ?? throw new InvalidOperationException("Wishlist couldn't be found");
    }

    public async Task<WishlistEntity?> GetByPublicId(string publicId)
    {
        return await repository.Query(query => query
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.PublicId == publicId));
    }

    public async Task<List<WishlistItemEntity>> GetItemsByPublicId(string publicId)
    {
        return await repository.Query(query => query
            .Include(x => x.Items)
            .ThenInclude(x => x.Image)
            .Where(x => x.PublicId == publicId)
            .SelectMany(x => x.Items)
            .OrderBy(x => x.IsBooked)
            .ThenBy(x => x.Created)
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
            UserId = currentUser.Id,
            PublicId = publicIdGenerator.Generate()
        };
        await repository.Add(wishlist);
        
        logger.LogInformation("User created wishlist '{0}'", wishlist.PublicId);

        return wishlist;
    }

    public async Task<WishlistEntity> Edit(string publicId, WishlistEditRequest request)
    {
        var wishlist = await GetCurrent();
        if (wishlist.PublicId != publicId) throw new InvalidOperationException();

        wishlist.Name = request.Name;
        await repository.Update(wishlist);

        return wishlist;
    }
}