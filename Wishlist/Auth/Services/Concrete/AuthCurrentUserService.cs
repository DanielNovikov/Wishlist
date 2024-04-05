using System.Security.Claims;
using Wishlist.Auth.Services.Abstract;
using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;

namespace Wishlist.Auth.Services.Concrete;

public class AuthCurrentUserService(
    IRepository<UserEntity> userRepository,
    IHttpContextAccessor contextAccessor) 
    : IAuthCurrentUserService
{
    public async ValueTask<UserEntity?> Get()
    {
        var userIdClaim = contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            return null;

        return await userRepository.GetById(userId);
    }
}