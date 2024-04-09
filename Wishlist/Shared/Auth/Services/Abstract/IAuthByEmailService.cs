using Wishlist.Shared.Auth.Models;

namespace Wishlist.Shared.Auth.Services.Abstract;

public interface IAuthByEmailService
{
    Task<AuthResponse?> SignIn(AuthSignInByEmailRequest request);

    Task<AuthResponse?> SignUp(AuthSignUpByEmailRequest request);
}