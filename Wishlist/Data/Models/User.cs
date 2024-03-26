using Wishlist.Data.Models.Enums;

namespace Wishlist.Data.Models;

public class User : EntityBase
{
    public required UserSource Source { get; set; }
    
    public required string ExternalId { get; set; }
}