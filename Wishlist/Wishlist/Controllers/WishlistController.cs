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
        var response = await wishlistService.TryGetCurrent();
        if (response == null) return NotFound();
        
        return Ok(response.ToResponse());
    }
    
    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var response = await wishlistService.GetById(id);
        if (response == null) return NotFound();
        
        return Ok(response.ToResponse());
    }

    [HttpGet("{id:int}/items")]
    [AllowAnonymous]
    public async Task<WishlistItemResponse[]> GetItemsById(int id)
    {
        var response = await wishlistService.GetItemsById(id);
        return response.Select(x => x.ToResponse()).ToArray();
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] WishlistCreateRequest request)
    {
        if (!request.IsValid()) return BadRequest();
        
        var response = await wishlistService.Create(request);
        return Ok(response.ToResponse());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Edit(int id, [FromBody] WishlistEditRequest request)
    {
        if (!request.IsValid()) return BadRequest();
        
        var response = await wishlistService.Edit(id, request);
        return Ok(response.ToResponse());
    }
}