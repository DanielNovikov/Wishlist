namespace Wishlist.Shared.Core.Services.Abstract;

public interface IUserService
{
    Task<bool> ExistsByEmail(string? email);
}