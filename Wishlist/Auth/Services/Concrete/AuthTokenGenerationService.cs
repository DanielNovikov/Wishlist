using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Wishlist.Auth.Models.Options;
using Wishlist.Auth.Services.Abstract;

namespace Wishlist.Auth.Services.Concrete;

public class AuthTokenGenerationService(IOptions<JwtOptions> options) : IAuthTokenGenerationService
{
    private const int TokenExpiryInYears = 10;
    
    public string Generate(int userId)
    {
        var key = Encoding.ASCII.GetBytes(options.Value.SigningKey);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString())
        };
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddYears(TokenExpiryInYears),
            Audience = options.Value.Audience,
            Issuer = options.Value.Issuer,
            SigningCredentials = credentials
        };
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(securityToken);
    }
}