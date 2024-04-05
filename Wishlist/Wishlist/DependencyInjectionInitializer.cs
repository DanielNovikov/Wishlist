using Wishlist.Wishlist.Services.Abstract;
using Wishlist.Wishlist.Services.Concrete;

namespace Wishlist.Wishlist;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddWishlist(this IServiceCollection services)
    {
        return services
            .AddTransient<IWishlistService, WishlistService>();
    }
}