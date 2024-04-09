using Wishlist.Data.Models;

namespace Wishlist.Shared.CurrentUser.Services.Abstract;

public interface ICurrentUserService
{
    ValueTask<UserEntity?> Get();
}