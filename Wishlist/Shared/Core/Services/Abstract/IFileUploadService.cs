namespace Wishlist.Shared.Core.Services.Abstract;

public interface IFileUploadService
{
    Task<string> Upload(IFormFile file);

    Task<string> Upload(byte[] file, string fileName);
}