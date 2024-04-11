namespace Wishlist.Shared.Core.Services.Abstract;

public interface IFIleService
{
    Task<string> Upload(IFormFile file);
}