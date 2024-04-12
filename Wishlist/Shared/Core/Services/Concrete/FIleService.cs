using Wishlist.Shared.Core.Services.Abstract;

namespace Wishlist.Shared.Core.Services.Concrete;

public class FIleService : IFIleService
{
    public async Task<string> Upload(IFormFile file)
    {
        var (webPath, path) = BuildPaths(file.FileName);
        
        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);

        return webPath;
    }

    public async Task<string> Upload(byte[] file, string fileName)
    {
        var (webPath, path) = BuildPaths(fileName);

        await using var stream = new FileStream(path, FileMode.Create);
        await stream.WriteAsync(file);

        return webPath;
    }

    private (string webPath, string path) BuildPaths(string fileName)
    {
        var webPath = Path.Combine("uploaded", Guid.NewGuid() + Path.GetExtension(fileName)).Replace("\\", "/");
        var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", webPath).Replace("\\", "/");;

        var directoryPath = Path.GetDirectoryName(path); 
        if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath!);
        
        return (webPath, path);
    }
}