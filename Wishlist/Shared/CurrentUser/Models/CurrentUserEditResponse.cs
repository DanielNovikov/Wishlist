using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;

namespace Wishlist.Shared.CurrentUser.Models;

public record CurrentUserEditResponse(string Name, UserSource Source, string? Email);

public static class CurrentUserEditResponseExtensions
{
    public static CurrentUserEditResponse ToEditResponse(this UserEntity userEntity)
    {
        return new CurrentUserEditResponse(userEntity.Name, userEntity.Source, userEntity.Email);
    }
}