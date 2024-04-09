using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Wishlist.Shared.Auth.Models.Options;
using Wishlist.Shared.Auth.Services.Abstract;
using Wishlist.Shared.Auth.Services.Concrete;

namespace Wishlist.Shared.Auth;

public static class DependencyInjectionInitializer
{
    public static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)))
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                var jwtOptions = configuration.GetSection(nameof(JwtOptions));

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions[nameof(JwtOptions.SigningKey)]!)),
                    ValidIssuer = jwtOptions[nameof(JwtOptions.Issuer)],
                    ValidAudience = jwtOptions[nameof(JwtOptions.Audience)]
                };
            }).Services
            .AddTransient<IAuthByEmailService, AuthByEmailService>()
            .AddTransient<IAuthByTelegramService, AuthByTelegramService>()
            .AddTransient<IAuthTokenGenerationService, AuthTokenGenerationService>();
    }
}