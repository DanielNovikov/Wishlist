using Wishlist.Auth.Models;

namespace Wishlist.Auth.Services.Abstract;

public interface IAuthByTelegramService
{
    ValueTask<AuthResponse?> SignIn(AuthSignInByTelegramRequest request);
}