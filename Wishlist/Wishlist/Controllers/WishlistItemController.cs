using Microsoft.AspNetCore.Mvc;
using Wishlist.Wishlist.Models;
using Wishlist.Wishlist.Services.Abstract;

namespace Wishlist.Wishlist.Controllers;

[ApiController]
[Route("api/wishlist-item")]
public class WishlistItemController(
    IWishlistItemScrapService scrapService) : ControllerBase
{

    [HttpPost("scrap")]
    public async Task<IActionResult> Scrap([FromBody] WishlistItemScrapRequest request)
    {
        if (!request.IsValid()) return BadRequest();

        var response = await scrapService.Scrap(request);
        if (response == null) return BadRequest();
        
        return Ok(response);
    }
    
}