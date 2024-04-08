using Wishlist.Shared.Services.Abstract;

namespace Wishlist.Shared.Services.Concrete;

public class TokenGenerator : ITokenGenerator
{
    private static readonly Random Random = new ();
    
    public string GenerateString()
    {
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var name = Enumerable.Repeat(chars, 8)
            .Select(s => s[Random.Next(s.Length)])
            .ToArray();
        
        return new string(name);
    }

    public string GenerateNumber()
    {
        return Random.Next(1000, 9999).ToString();
    }
}