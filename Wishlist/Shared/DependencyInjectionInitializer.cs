using Wishlist.Shared.Models.Options;
using Wishlist.Shared.Services.Abstract;
using Wishlist.Shared.Services.Concrete;

namespace Wishlist.Shared;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddShared(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .Configure<TelegramLogOptions>(configuration.GetSection(nameof(TelegramLogOptions)))
            .AddSingleton<ITokenGenerator, TokenGenerator>();
    }
}