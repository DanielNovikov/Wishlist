using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Auth.Models;
using Wishlist.Shared.Auth.Services.Abstract;
using Wishlist.Shared.Core.Services.Abstract;
using Wishlist.Shared.CurrentUser.Models;

namespace Wishlist.Shared.Auth.Services.Concrete;

public class AuthByEmailService(
    IRepository<UserEntity> userRepository, 
    IUserService userService,
    IAuthTokenGenerationService authTokenGenerationService,
    ILogger<AuthByEmailService> logger) 
    : IAuthByEmailService
{
    public async Task<AuthResponse?> SignIn(AuthSignInByEmailRequest request)
    {
        var user = await userService.GetByEmailAndPassword(request.Email, request.Password);
        
        if (user == null) return null;

        logger.LogInformation("User logged in\nEmail: '{0}'", request.Email);
        
        var authToken = authTokenGenerationService.Generate(user.Id);
        return new AuthResponse(authToken, user.ToResponse());
    }

    public async Task<AuthResponse?> SignUp(AuthSignUpByEmailRequest request)
    {
        var existsByEmail = await userService.ExistsByEmail(request.Email);
        if (existsByEmail) return null;

        var user = new UserEntity
        {
            Source = UserSource.Email,
            Name = request.Name!,
            Email = request.Email,
            Password = request.Password
        };

        await userRepository.Add(user);

        logger.LogInformation("User signed up\nEmail: '{0}'", request.Email);

        var authToken = authTokenGenerationService.Generate(user.Id);
        return new AuthResponse(authToken, user.ToResponse());
    }
}