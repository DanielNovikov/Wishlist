namespace Wishlist.Shared.Auth.Models;

public class AuthSignInByTelegramRequest
{
    public required string Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}