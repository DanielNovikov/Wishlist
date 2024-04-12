using System.Text.RegularExpressions;

namespace Wishlist.Wishlist.Utilities;

public class WishlistValidationUtilities
{
    private const string UrlPattern = @"^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$";

    public static readonly Func<string?, bool> IsNameValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 100;
    
    public static readonly Func<string?, bool> IsTitleValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 100;
    
    public static readonly Func<string?, bool> IsDescriptionValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 500;
    
    public static readonly Func<string, bool> IsUrlValid =
        url => !string.IsNullOrEmpty(UrlPattern) && url.Length <= 300 && Regex.IsMatch(url, UrlPattern);
}