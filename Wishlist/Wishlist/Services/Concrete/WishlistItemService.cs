using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.CurrentUser.Services.Abstract;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class WishlistItemService(
    IWishlistService wishlistService,
    IRepository<WishlistItemEntity> repository) 
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
            entity.Image = new ImageEntity
            {
                Path = request.ImageSrc
            };
        }

        await repository.Add(entity);
    }

    public async Task Delete(int id)
    {
        var entity = await repository.GetById(id);
        if (entity == null) return;
        
        var wishlist = await wishlistService.GetCurrent();
        if (entity.WishlistId != wishlist.Id) return;

        await repository.Delete(entity);
    }
}