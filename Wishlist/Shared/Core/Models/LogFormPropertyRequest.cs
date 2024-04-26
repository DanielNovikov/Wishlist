namespace Wishlist.Shared.Core.Models;

public record LogFormPropertyRequest(string Name, string? Value, LogFormPropertyErrorRequest[] Errors);