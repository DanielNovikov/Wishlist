using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Shared.Core.Utilities;

namespace Wishlist.Shared.CurrentUser.Models;

public record CurrentUserEditRequest(string Name, string? Email, string? Password, string? AvatarPath)
{
    public bool IsValid(UserEntity user)
    {
        var isValid = UserValidationUtilities.IsNameValid(Name) && 
                      (string.IsNullOrEmpty(AvatarPath) || AvatarPath.Length <= 200);

        if (user.Source == UserSource.Email)
        {
            isValid = isValid && UserValidationUtilities.IsEmailValid(Email);

            if (!string.IsNullOrEmpty(Password))
                isValid = isValid && UserValidationUtilities.IsPasswordValid(Password);
        }

        return isValid;
    }
}