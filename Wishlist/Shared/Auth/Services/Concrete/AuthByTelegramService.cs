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
    IAuthTokenGenerationService authTokenGenerationService) 
    : IAuthByTelegramService
{
    public async ValueTask<AuthResponse?> SignIn(AuthSignInByTelegramRequest request)
    {
        using var loginWidget = new LoginWidget(options.Value.AccessToken);
        if (loginWidget.CheckAuthorization(request.Query) != Authorization.Valid) return null;

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

        var authToken = authTokenGenerationService.Generate(user.Id);
        return new AuthResponse(authToken, user.ToResponse());
    }
}