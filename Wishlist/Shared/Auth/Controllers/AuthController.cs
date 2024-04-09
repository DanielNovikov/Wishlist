using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wishlist.Shared.Auth.Models;
using Wishlist.Shared.Auth.Services.Abstract;

namespace Wishlist.Shared.Auth.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController(
    IAuthByEmailService authByEmailService,
    IAuthByTelegramService authByTelegramService) 
    : ControllerBase
{
    [HttpPost("email/sign-in")]
    [AllowAnonymous]
    public async Task<IActionResult> SignInByEmail([FromBody] AuthSignInByEmailRequest request)
    {
        if (!request.IsValid()) return BadRequest();

        var response = await authByEmailService.SignIn(request);
        if (response == null) return BadRequest();
        
        return Ok(response);
    }

    [HttpPost("email/sign-up")]
    [AllowAnonymous]
    public async Task<IActionResult> SignUpByEmail([FromBody] AuthSignUpByEmailRequest request)
    {
        if (!request.IsValid()) return BadRequest();

        var response = await authByEmailService.SignUp(request);
        if (response == null) return BadRequest();

        return Ok(response);
    }

    [HttpGet("telegram")]
    [AllowAnonymous]
    public async Task<IActionResult> SignInByTelegram([FromBody] AuthSignInByTelegramRequest request)
    {
        var response = await authByTelegramService.SignIn(request);
        if (response == null) return BadRequest();

        return Ok(response);
    }
}