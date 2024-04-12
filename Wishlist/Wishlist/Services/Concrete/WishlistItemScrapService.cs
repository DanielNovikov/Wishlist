using AngleSharp.Dom;
using AngleSharp.Html.Dom;
using Wishlist.Shared.Core.Services.Abstract;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class WishlistItemScrapService(
    IHtmlLoadService htmlLoadService,
    IImageLoadService imageLoadService,
    IFIleService fIleService) 
    : IWishlistItemScrapService
{
    public async Task<WishlistItemScrapResponse?> Scrap(WishlistItemScrapRequest request)
    {
        var htmlDocument = await htmlLoadService.Load(request.Url);
        if (htmlDocument == null) return null;

        var title = htmlDocument.QuerySelector<IHtmlElement>("title")?.InnerHtml;

        var imagePath = default(string);
        var imageUrl = htmlDocument.QuerySelector<IHtmlMetaElement>("meta[property='og:image']")?.Content;
        if (!string.IsNullOrEmpty(imageUrl))
        {
            var image = await imageLoadService.Load(imageUrl);
            if (image != null)
                imagePath = await fIleService.Upload(image, imageUrl);
        }

        return new WishlistItemScrapResponse(title, imagePath);
    }
}