using AngleSharp.Html.Parser;
using Wishlist.Wishlist.Services.Abstract;
using Wishlist.Wishlist.Services.Concrete;

namespace Wishlist.Wishlist;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddWishlist(this IServiceCollection services)
    {
        return services
            .AddTransient<IWishlistService, WishlistService>()
            .AddTransient<IWishlistItemScrapService, WishlistItemScrapService>()
            .AddHttpClient<IHtmlLoadService, HtmlLoadService>().Services
            .AddHttpClient<IImageLoadService, ImageLoadService>().Services
            .AddTransient<IHtmlParser, HtmlParser>();
    }
}