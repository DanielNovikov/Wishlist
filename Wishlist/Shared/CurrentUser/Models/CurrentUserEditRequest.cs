using Wishlist.Data.Models;
using Wishlist.Data.Models.Enums;
using Wishlist.Shared.Core.Utilities;

namespace Wishlist.Shared.CurrentUser.Models;

public record CurrentUserEditRequest(string Name, string? Email, string? Password)
{
    public bool IsValid(UserEntity user)
    {
        var isValid = ValidationUtilities.IsNameValid(Name);

        if (user.Source == UserSource.Email)
        {
            isValid = isValid && ValidationUtilities.IsEmailValid(Email);

            if (!string.IsNullOrEmpty(Password))
                isValid = isValid && ValidationUtilities.IsPasswordValid(Password);
        }

        return isValid;
    }
}