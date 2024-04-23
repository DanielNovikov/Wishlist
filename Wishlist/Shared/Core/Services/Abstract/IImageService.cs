using Wishlist.Data.Models;

namespace Wishlist.Shared.Core.Services.Abstract;

public interface IImageService
{
    Task Delete(int id);

    Task<ImageEntity> Create(string path);
}