using Wishlist.Shared.Core.Models.Options;
using Wishlist.Shared.Core.Services.Abstract;
using Wishlist.Shared.Core.Services.Concrete;

namespace Wishlist.Shared.Core;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddShared(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .Configure<TelegramLogOptions>(configuration.GetSection(nameof(TelegramLogOptions)))
            .AddTransient<IFileUploadService, FileUploadService>()
            .AddTransient<IUserService, UserService>()
            .AddTransient<IImageService, ImageService>()
            .AddSingleton<ILogger>(provider => new TelegramLogger(provider.GetRequiredService<IConfiguration>()));
    }
}