namespace Wishlist.Auth.Models;

public record AuthResponse(string AuthToken, AuthUserResponse User);