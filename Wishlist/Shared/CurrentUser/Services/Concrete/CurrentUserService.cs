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
    public async ValueTask<UserEntity?> TryGet()
    {
        var userIdClaim = contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            return null;

        return await userService.GetById(userId);
    }

    public async ValueTask<UserEntity> Get()
    {
        return await TryGet() ?? throw new InvalidOperationException("User couldn't be found");
    }

    public async Task<UserEntity?> Edit(CurrentUserEditRequest request)
    {
        var currentUser = await Get();
        
        if (currentUser.Source == UserSource.Email && currentUser.Email != request.Email)
        {
            var exists = await userService.ExistsByEmail(request.Email);
            if (exists) return null;
        }
        
        currentUser.Name = request.Name;
        if (currentUser.Source == UserSource.Email)
        {
            currentUser.Email = request.Email;
            
            if (!string.IsNullOrEmpty(request.Password))
                currentUser.Password = request.Password;
        }

        if (!string.IsNullOrEmpty(request.AvatarPath))
        {
            if (string.IsNullOrEmpty(currentUser.Avatar?.Path))
            {
                currentUser.Avatar = new ImageEntity
                {
                    Path = request.AvatarPath
                };
            }
            else
            {
                currentUser.Avatar.Path = request.AvatarPath;
            }
        }

        await userRepository.Update(currentUser);
        return currentUser;
    }
}