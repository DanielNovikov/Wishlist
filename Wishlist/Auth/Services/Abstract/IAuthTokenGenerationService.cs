namespace Wishlist.Auth.Services.Abstract;

public interface IAuthTokenGenerationService
{
    string Generate(int userId);
}