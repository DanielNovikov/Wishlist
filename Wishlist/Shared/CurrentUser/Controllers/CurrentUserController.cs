using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wishlist.Shared.CurrentUser.Models;
using Wishlist.Shared.CurrentUser.Services.Abstract;

namespace Wishlist.Shared.CurrentUser.Controllers;

[Route("api/current-user")]
[ApiController]
public class CurrentUserController(ICurrentUserService currentUserService) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get()
    {
        var user = await currentUserService.Get();
        return Ok(user.ToResponse());
    }
    
    [HttpGet("edit")]
    [Authorize]
    public async Task<IActionResult> GetForEdit()
    {
        var user = await currentUserService.Get();
        return Ok(user.ToEditResponse());
    }

    [HttpPost("edit")]
    [Authorize]
    public async Task<IActionResult> Edit([FromBody] CurrentUserEditRequest request)
    {
        var user = await currentUserService.Get();
        if (!request.IsValid(user)) return BadRequest();

        user = await currentUserService.Edit(request);
        if (user == null) return BadRequest();
        
        return Ok(user.ToResponse());
    }
}