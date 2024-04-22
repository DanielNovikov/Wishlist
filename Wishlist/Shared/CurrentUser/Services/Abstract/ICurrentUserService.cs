using Wishlist.Data.Models;
using Wishlist.Shared.CurrentUser.Models;

namespace Wishlist.Shared.CurrentUser.Services.Abstract;

public interface ICurrentUserService
{
    ValueTask<UserEntity?> TryGet();
    
    ValueTask<UserEntity> Get();

    Task<UserEntity?> Edit(CurrentUserEditRequest request);
}