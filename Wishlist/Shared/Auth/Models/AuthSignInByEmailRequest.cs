using System.Text.RegularExpressions;

namespace Wishlist.Shared.Auth.Models;

public record AuthSignInByEmailRequest(string? Email, string? Password)
{
    private const string EmailPattern = @"^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$";
    
    public virtual bool IsValid()
    {
        return !string.IsNullOrEmpty(Email) && Email.Length <= 100 && Regex.IsMatch(Email, EmailPattern) && 
               !string.IsNullOrEmpty(Password) && Password.Length <= 50;
    }
};