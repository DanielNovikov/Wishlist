using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Shared.Core.Utilities;

namespace Wishlist.Shared.CurrentUser.Models;

public record CurrentUserEditRequest(string Name, string? Email, string? Password, string? AvatarPath)
{
    public bool IsValid(UserEntity user)
    {
        var isValid = CoreValidationUtilities.IsNameValid(Name) && 
                      (string.IsNullOrEmpty(AvatarPath) || CoreValidationUtilities.IsPathValid(AvatarPath));

        if (user.Source == UserSource.Email)
        {
            isValid = isValid && CoreValidationUtilities.IsEmailValid(Email);

            if (!string.IsNullOrEmpty(Password))
                isValid = isValid && CoreValidationUtilities.IsPasswordValid(Password);
        }

        return isValid;
    }
}