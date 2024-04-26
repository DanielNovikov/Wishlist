using Wishlist.Shared.Core.Models.Options;
using Wishlist.Shared.Core.Services.Abstract;
using Wishlist.Shared.Core.Services.Concrete;
using Wishlist.Shared.CurrentUser.Services.Abstract;
using Wishlist.Shared.CurrentUser.Services.Concrete;

namespace Wishlist.Shared.CurrentUser;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddCurrentUser(this IServiceCollection services)
    {
        return services
            .AddTransient<ICurrentUserService, CurrentUserService>();
    }
}