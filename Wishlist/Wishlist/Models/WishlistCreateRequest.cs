﻿using Wishlist.Wishlist.Utilities;

namespace Wishlist.Wishlist.Models;

public record WishlistCreateRequest(string Name)
{
    public bool IsValid()
    {
        return WishlistValidationUtilities.IsNameValid(Name);
    }
};