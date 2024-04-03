using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Data.Repositories.Concrete;

namespace Wishlist.Data;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddData(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .AddScoped(typeof(IRepository<>), typeof(Repository<>))
            .AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("WishlistDB")));
    }
}