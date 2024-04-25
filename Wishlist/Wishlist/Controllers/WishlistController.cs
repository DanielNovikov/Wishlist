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
    
    [HttpGet("{publicId}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByPublicId(string publicId)
    {
        var response = await wishlistService.GetByPublicId(publicId);
        if (response == null) return NotFound();
        
        return Ok(response.ToResponse());
    }

    [HttpGet("{publicId}/items")]
    [AllowAnonymous]
    public async Task<WishlistItemResponse[]> GetItemsByPublicId(string publicId)
    {
        var response = await wishlistService.GetItemsByPublicId(publicId);
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

    [HttpPut("{publicId}")]
    [Authorize]
    public async Task<IActionResult> Edit(string publicId, [FromBody] WishlistEditRequest request)
    {
        if (!request.IsValid()) return BadRequest();
        
        var response = await wishlistService.Edit(publicId, request);
        return Ok(response.ToResponse());
    }
}