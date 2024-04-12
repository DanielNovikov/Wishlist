using Wishlist.Shared.Core.Models;
using Wishlist.Shared.Core.Utilities;

namespace Wishlist.Shared.Auth.Models;

public record AuthSignUpByEmailRequest(string? Name, string? Email, string? Password) : AuthSignInByEmailRequest(Email, Password)
{
    public override bool IsValid()
    {
        return base.IsValid() && UserValidationUtilities.IsNameValid(Name);
    }
};