using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class ImageLoadService(HttpClient httpClient) : IImageLoadService
{
    public async Task<byte[]?> Load(string url)
    {
        try
        {
            var response = await httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) return null;

            return await response.Content.ReadAsByteArrayAsync();
        }
        catch (Exception ex)
        {
            // TODO: log
            return null;
        }
    }
}