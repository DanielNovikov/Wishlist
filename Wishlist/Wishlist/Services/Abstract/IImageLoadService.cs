namespace Wishlist.Wishlist.Services.Abstract;

public interface IImageLoadService
{
    Task<byte[]?> Load(string url);
}