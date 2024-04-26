using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Wishlist.Shared.Core.Models;

namespace Wishlist.Shared.Core.Controllers;

[ApiController]
[Route("api/log")]
public class LogController(ILogger<LogController> logger) : ControllerBase
{
    [HttpPost("form")]
    public IActionResult LogForm([FromBody] LogFormRequest request)
    {
        var message = new StringBuilder();
        message.AppendLine("Validation errors occurred:");
        
        foreach (var property in request.Properties)
        {
            message.Append($"{property.Name} - {property.Value}");
            
            if (property.Errors.Length > 0)
            {
                message.Append(". Errors: ");
                var errorMessages = property.Errors.Select(e => $"{e.Name} - '{e.Value}'");
                message.Append(string.Join(", ", errorMessages));
            }
            
            message.AppendLine();
        }
        
        logger.LogWarning(message.ToString());

        return Ok();
    }
}