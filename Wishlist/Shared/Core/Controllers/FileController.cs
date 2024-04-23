using Microsoft.AspNetCore.Mvc;
using Wishlist.Shared.Core.Services.Abstract;

namespace Wishlist.Shared.Core.Controllers;

[ApiController]
[Route("api/file")]
public class FileController(IFileUploadService fileUploadService) : ControllerBase
{
    [HttpPost("upload")]
    public async Task<string> Upload(IFormFile file)
    {
        return await fileUploadService.Upload(file);
    }
}