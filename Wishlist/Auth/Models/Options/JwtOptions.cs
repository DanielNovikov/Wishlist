﻿namespace Wishlist.Auth.Models.Options;

public class JwtOptions
{
    public required string SigningKey { get; set; }
    
    public required string Issuer { get; set; }
    
    public required string Audience { get; set; }
}