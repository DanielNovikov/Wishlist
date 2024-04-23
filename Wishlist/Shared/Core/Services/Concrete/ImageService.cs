using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Core.Services.Abstract;

namespace Wishlist.Shared.Core.Services.Concrete;

public class ImageService(IRepository<ImageEntity> repository) : IImageService
{
    public async Task Delete(int id)
    {
        var entity = await repository.GetById(id);
        if (entity != null)
            await repository.Delete(entity);
    }

    public async Task<ImageEntity> Create(string path)
    {
        var entity = new ImageEntity
        {
            Path = path
        };

        await repository.Add(entity);
        return entity;
    }
}