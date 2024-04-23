using System.Text.RegularExpressions;

namespace Wishlist.Wishlist.Utilities;

public class WishlistValidationUtilities
{
    public static readonly Func<string?, bool> IsNameValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 100;
    
    public static readonly Func<string?, bool> IsTitleValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 300;
    
    public static readonly Func<string?, bool> IsDescriptionValid = 
        name => !string.IsNullOrEmpty(name) && name.Length <= 500;
}