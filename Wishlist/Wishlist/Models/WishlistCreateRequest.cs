namespace Wishlist.Wishlist.Models;

public record WishlistCreateRequest(string Name)
{
    public bool IsValid()
    {
        return !string.IsNullOrWhiteSpace(Name) && Name.Length <= 100;
    }
};