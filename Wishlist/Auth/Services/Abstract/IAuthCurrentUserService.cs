using Wishlist.Data.Models;

namespace Wishlist.Auth.Services.Abstract;

public interface IAuthCurrentUserService
{
    ValueTask<User?> Get();
}