using System.Security.Claims;
using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.CurrentUser.Services.Abstract;

namespace Wishlist.Shared.CurrentUser.Services.Concrete;

public class CurrentUserService(
    IRepository<UserEntity> userRepository,
    IHttpContextAccessor contextAccessor) 
    : ICurrentUserService
{
    public async ValueTask<UserEntity?> Get()
    {
        var userIdClaim = contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            return null;

        return await userRepository.GetById(userId);
    }
}