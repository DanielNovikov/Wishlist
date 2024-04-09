using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Auth.Models;
using Wishlist.Shared.Auth.Services.Abstract;
using Wishlist.Shared.CurrentUser.Models;

namespace Wishlist.Shared.Auth.Services.Concrete;

public class AuthByEmailService(
    IRepository<UserEntity> userRepository, 
    IAuthTokenGenerationService authTokenGenerationService) 
    : IAuthByEmailService
{
    public async Task<AuthResponse?> SignIn(AuthSignInByEmailRequest request)
    {
        var user = await userRepository.Query(query => query
            .FirstOrDefaultAsync(x => x.Email == request.Email && x.Password == request.Password));

        if (user == null) return null;

        var authToken = authTokenGenerationService.Generate(user.Id);
        return new AuthResponse(authToken, user.ToResponse());
    }

    public async Task<AuthResponse?> SignUp(AuthSignUpByEmailRequest request)
    {
        var user = await userRepository.Query(query => query
            .FirstOrDefaultAsync(x => x.Email == request.Email));

        if (user != null) return null;

        user = new UserEntity
        {
            Source = UserSource.Email,
            Name = request.Name!,
            Email = request.Email,
            Password = request.Password
        };

        await userRepository.Add(user);

        var authToken = authTokenGenerationService.Generate(user.Id);
        return new AuthResponse(authToken, user.ToResponse());
    }
}