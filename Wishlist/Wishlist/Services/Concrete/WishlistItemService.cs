using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Core.Services.Abstract;
using Wishlist.Shared.CurrentUser.Services.Abstract;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class WishlistItemService(
    IWishlistService wishlistService,
    IRepository<WishlistItemEntity> repository,
    IImageService imageService) 
    : IWishlistItemService
{
    public async Task Create(WishlistItemCreateRequest request)
    {
        var wishlist = await wishlistService.GetCurrent();
        
        var entity = new WishlistItemEntity
        {
            Title = request.Title,
            Description = request.Description,
            Url = request.Url,
            Price = request.Price,
            WishlistId = wishlist.Id
        };

        if (!string.IsNullOrEmpty(request.ImageSrc))
        {
            var image = await imageService.Create(request.ImageSrc);
            entity.ImageId = image.Id;
        }

        await repository.Add(entity);
    }

    public async Task Update(int id, WishlistItemUpdateRequest request)
    {
        var entity = await repository.GetById(id);
        if (entity == null) return;
        
        var wishlist = await wishlistService.GetCurrent();
        if (entity.WishlistId != wishlist.Id) return;

        entity.Title = request.Title;
        entity.Description = request.Description;
        entity.Price = request.Price;
        entity.Url = request.Url;

        // Deleting existing image entity
        if (entity.ImageId.HasValue)
        {
            await imageService.Delete(entity.ImageId.Value);
            entity.ImageId = null;
        }
        
        // Creating new image entity if request has image path 
        if (!string.IsNullOrWhiteSpace(request.ImageSrc))
        {
            var image = await imageService.Create(request.ImageSrc);
            entity.ImageId = image.Id;
        }

        await repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var entity = await repository.GetById(id);
        if (entity == null) return;
        
        var wishlist = await wishlistService.GetCurrent();
        if (entity.WishlistId != wishlist.Id) return;

        await repository.Delete(entity);
    }

    public async Task<bool> Book(int id)
    {
        var entity = await repository.GetById(id);
        if (entity == null) return false;
        if (entity.IsBooked) return false;

        entity.IsBooked = true;
        await repository.Update(entity);

        return true;
    }
}