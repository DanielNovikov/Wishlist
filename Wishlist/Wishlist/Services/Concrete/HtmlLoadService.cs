using System.Text;
using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class HtmlLoadService(HttpClient httpClient, IHtmlParser htmlParser) : IHtmlLoadService
{
    public async Task<IHtmlDocument?> Load(string url)
    {
        try
        {
            var response = await httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) return null;

            await using var htmlStream = await response.Content.ReadAsStreamAsync();
            return await htmlParser.ParseDocumentAsync(htmlStream);
        }
        catch (Exception ex)
        {
            // TODO: log
            return null;
        }
    }
}