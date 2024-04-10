using Wishlist.Data.Models;
using Wishlist.Shared.CurrentUser.Models;

namespace Wishlist.Shared.CurrentUser.Services.Abstract;

public interface ICurrentUserService
{
    ValueTask<UserEntity?> Get();

    Task<UserEntity?> Edit(UserEntity user, CurrentUserEditRequest request);
}