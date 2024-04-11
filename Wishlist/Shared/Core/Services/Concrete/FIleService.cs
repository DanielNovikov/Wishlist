using Wishlist.Shared.Core.Services.Abstract;

namespace Wishlist.Shared.Core.Services.Concrete;

public class FIleService : IFIleService
{
    public async Task<string> Upload(IFormFile file)
    {
        var webPath = Path.Combine("uploaded", Guid.NewGuid().ToString() + Path.GetExtension(file.FileName)).Replace("\\", "/");
        var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", webPath).Replace("\\", "/");;

        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);

        return webPath;
    }
}