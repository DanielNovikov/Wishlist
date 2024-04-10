using Wishlist.Data.Models;

namespace Wishlist.Shared.CurrentUser.Models;

public record CurrentUserResponse(string Name);

public static class CurrentUserResponseExtensions
{
    public static CurrentUserResponse ToResponse(this UserEntity userEntity)
    {
        return new CurrentUserResponse(userEntity.Name);
    }
}