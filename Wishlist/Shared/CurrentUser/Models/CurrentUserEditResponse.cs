using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;

namespace Wishlist.Shared.CurrentUser.Models;

public class CurrentUserEditResponse(int Id, string Name, UserSource source, string? Email);

public static class CurrentUserEditResponseExtensions
{
    public static CurrentUserResponse ToEditResponse(this UserEntity userEntity)
    {
        return new CurrentUserResponse(userEntity.Id, userEntity.Name);
    }
}