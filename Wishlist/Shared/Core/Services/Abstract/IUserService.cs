using Wishlist.Data.Models;

namespace Wishlist.Shared.Core.Services.Abstract;

public interface IUserService
{
    Task<bool> ExistsByEmail(string? email);

    Task<UserEntity?> GetById(int id);

    Task<UserEntity?> GetByEmailAndPassword(string email, string password);
}