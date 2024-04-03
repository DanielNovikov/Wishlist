using Wishlist.Shared.Services.Abstract;
using Wishlist.Shared.Services.Concrete;

namespace Wishlist.Shared;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddShared(this IServiceCollection services)
    {
        return services
            .AddSingleton<ITokenGenerator, TokenGenerator>();
    }
}