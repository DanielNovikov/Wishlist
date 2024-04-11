using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
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

        return await userService.GetById(userId);
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

        if (!string.IsNullOrEmpty(request.AvatarPath))
        {
            if (string.IsNullOrEmpty(user.Avatar?.Path))
            {
                user.Avatar = new ImageEntity
                {
                    Path = request.AvatarPath
                };
            }
            else
            {
                user.Avatar.Path = request.AvatarPath;
            }
        }

        await userRepository.Update(user);
        return user;
    }
}