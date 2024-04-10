using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;
using Wishlist.Data.Repositories.Abstract;
using Wishlist.Shared.Core.Services.Abstract;

namespace Wishlist.Shared.Core.Services.Concrete;

public class UserService(IRepository<UserEntity> userRepository) : IUserService
{
    public async Task<bool> ExistsByEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        
        return await userRepository.Query(query => query.AnyAsync(x => x.Email == email));
    }
}