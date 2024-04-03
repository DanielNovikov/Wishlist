using Wishlist.Auth.Models;

namespace Wishlist.Auth.Services.Abstract;

public interface IAuthByEmailService
{
    Task<AuthResponse?> SignIn(AuthSignInByEmailRequest request);

    Task<AuthResponse?> SignUp(AuthSignUpByEmailRequest request);
}