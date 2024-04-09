using Wishlist.Shared.Auth.Models;

namespace Wishlist.Shared.Auth.Services.Abstract;

public interface IAuthByTelegramService
{
    ValueTask<AuthResponse?> SignIn(AuthSignInByTelegramRequest request);
}