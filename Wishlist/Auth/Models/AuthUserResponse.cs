using Wishlist.Data.Models;

namespace Wishlist.Auth.Models;

public record AuthUserResponse(int Id, string Name);

public static class AuthUserResponseExtensions
{
    public static AuthUserResponse ToResponse(this User user)
    {
        return new AuthUserResponse(user.Id, user.Name);
    }
}