using Wishlist.Shared.CurrentUser.Models;

namespace Wishlist.Shared.Auth.Models;

public record AuthResponse(string AuthToken, CurrentUserResponse User);