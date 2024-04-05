using Wishlist.Data.Models;

namespace Wishlist.Auth.Models;

public record AuthUserResponse(int Id, string Name);

public static class AuthUserResponseExtensions
{
    public static AuthUserResponse ToResponse(this UserEntity userEntity)
    {
        return new AuthUserResponse(userEntity.Id, userEntity.Name);
    }
}