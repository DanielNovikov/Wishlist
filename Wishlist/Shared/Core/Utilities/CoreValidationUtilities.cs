using System.Text.RegularExpressions;

namespace Wishlist.Shared.Core.Utilities;

public class CoreValidationUtilities
{
    private const string EmailPattern = @"^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$";
    
    public static readonly Func<string?, bool> IsNameValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 50;

    public static readonly Func<string?, bool> IsEmailValid =
        email => !string.IsNullOrEmpty(email) && email.Length <= 100 && Regex.IsMatch(email, EmailPattern);

    public static readonly Func<string?, bool> IsPasswordValid =
        password => !string.IsNullOrEmpty(password) && password.Length <= 50;

    public static readonly Func<string, bool> IsPathValid =
        path => path.Length <= 200;
}