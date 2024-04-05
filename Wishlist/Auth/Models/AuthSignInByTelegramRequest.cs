﻿namespace Wishlist.Auth.Models;

public class AuthSignInByTelegramRequest
{
    public required string Id { get; set; }
    public required Dictionary<string, string> Query { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}