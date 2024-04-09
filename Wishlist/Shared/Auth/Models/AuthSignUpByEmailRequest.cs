namespace Wishlist.Shared.Auth.Models;

public record AuthSignUpByEmailRequest(string? Name, string? Email, string? Password) : AuthSignInByEmailRequest(Email, Password)
{
    public override bool IsValid()
    {
        return base.IsValid() && !string.IsNullOrEmpty(Name) && Name.Length <= 50;
    }
};