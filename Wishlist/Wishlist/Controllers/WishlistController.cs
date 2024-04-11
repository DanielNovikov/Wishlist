using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Controllers;

[Route("api/wishlist")]
[ApiController]
public class WishlistController(
    IWishlistService wishlistService) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get()
    {
        var response = await wishlistService.Get();
        if (response == null) return NotFound();
        
        return Ok(response);
    }
    
    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var response = await wishlistService.GetById(id);
        if (response == null) return NotFound();
        
        return Ok(response);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] WishlistCreateRequest request)
    {
        var response = await wishlistService.Create(request);
        return Ok(response);
    }
}