using System.Security.Claims;
using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Core.Services.Abstract;
using Wishlist.Shared.CurrentUser.Models;
using Wishlist.Shared.CurrentUser.Services.Abstract;

namespace Wishlist.Shared.CurrentUser.Services.Concrete;

public class CurrentUserService(
    IRepository<UserEntity> userRepository,
    IHttpContextAccessor contextAccessor,
    IUserService userService) 
    : ICurrentUserService
{
    public async ValueTask<UserEntity?> Get()
    {
        var userIdClaim = contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            return null;

        return await userRepository.GetById(userId);
    }

    public async Task<UserEntity?> Edit(UserEntity user, CurrentUserEditRequest request)
    {
        if (user.Source == UserSource.Email && user.Email != request.Email)
        {
            var exists = await userService.ExistsByEmail(request.Email);
            if (exists) return null;
        }
        
        user.Name = request.Name;
        if (user.Source == UserSource.Email)
        {
            user.Email = request.Email;
            
            if (!string.IsNullOrEmpty(request.Password))
                user.Password = request.Password;
        }

        await userRepository.Update(user);
        return user;
    }
}