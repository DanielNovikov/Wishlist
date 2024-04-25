using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Controllers;

[ApiController]
[Route("api/wishlist-item")]
public class WishlistItemController(
    IWishlistItemScrapService wishlistItemScrapService,
    IWishlistItemService wishlistItemService) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] WishlistItemCreateRequest request)
    {
        if (!request.IsValid()) return BadRequest();

        await wishlistItemService.Create(request);
        return Ok(true);
    }
    
    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] WishlistItemUpdateRequest request)
    {
        if (!request.IsValid()) return BadRequest();

        await wishlistItemService.Update(id, request);
        return Ok(true);
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        await wishlistItemService.Delete(id);
        return Ok();
    }
    
    [HttpPost("scrap")]
    [Authorize]
    public async Task<IActionResult> Scrap([FromBody] WishlistItemScrapRequest request)
    {
        if (!request.IsValid()) return BadRequest();

        var response = await wishlistItemScrapService.Scrap(request);
        if (response == null) return BadRequest();
        
        return Ok(response);
    }

    [HttpPost("{id:int}/book")]
    public async Task<IActionResult> Book(int id)
    {
        var result = await wishlistItemService.Book(id);
        return Ok(result);
    }
}