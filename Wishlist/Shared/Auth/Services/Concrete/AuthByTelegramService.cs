using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Telegram.Bot.Extensions.LoginWidget;
using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Auth.Models;
using Wishlist.Shared.Auth.Services.Abstract;
using Wishlist.Shared.Core.Models.Options;
using Wishlist.Shared.CurrentUser.Models;

namespace Wishlist.Shared.Auth.Services.Concrete;

public class AuthByTelegramService(
    IOptions<TelegramLogOptions> options,
    IRepository<UserEntity> userRepository,
    IAuthTokenGenerationService authTokenGenerationService,
    ILogger<AuthByEmailService> logger,
    IHttpContextAccessor httpContextAccessor) 
    : IAuthByTelegramService
{
    public async ValueTask<AuthResponse?> SignIn(AuthSignInByTelegramRequest request)
    {
        var requestQuery = httpContextAccessor.HttpContext?.Request.Query
            .ToDictionary(x => x.Key, x => x.Value.First() ?? string.Empty);
        
        using var loginWidget = new LoginWidget(options.Value.AccessToken);
        if (loginWidget.CheckAuthorization(requestQuery) != Authorization.Valid) return null;

        var user = await userRepository.Query(query => query
            .Include(x => x.Avatar)
            .FirstOrDefaultAsync(x => x.ExternalId == request.Id && x.Source == UserSource.Telegram));

        var name = $"{request.FirstName} {request.LastName}";
        if (string.IsNullOrWhiteSpace(name)) name = "Користувач";
        
        if (user == null)
        {
            user = new UserEntity
            {
                Source = UserSource.Telegram,
                ExternalId = request.Id,
                Name = name
            };

            await userRepository.Add(user);
        }
        
        logger.LogInformation("User logged in by telegram\nName: '{0}'", name);

        var authToken = authTokenGenerationService.Generate(user.Id);
        return new AuthResponse(authToken, user.ToResponse());
    }
}