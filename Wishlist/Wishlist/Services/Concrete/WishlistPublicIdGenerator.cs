using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Services.Concrete;

public class WishlistPublicIdGenerator : IWishlistPublicIdGenerator
{
    private static readonly Random Random = new();
    public string Generate()
    {
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var name = Enumerable.Repeat(chars, 8)
            .Select(s => s[Random.Next(s.Length)])
            .ToArray();
        
        return new string(name);
    }
}