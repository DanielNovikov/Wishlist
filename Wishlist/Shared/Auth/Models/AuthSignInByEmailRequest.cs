﻿using System.Text.RegularExpressions;
using Wishlist.Shared.Core.Models;
using Wishlist.Shared.Core.Utilities;

namespace Wishlist.Shared.Auth.Models;

public record AuthSignInByEmailRequest(string Email, string Password)
{
    
    public virtual bool IsValid()
    {
        return CoreValidationUtilities.IsEmailValid(Email) && CoreValidationUtilities.IsPasswordValid(Password);
    }
};