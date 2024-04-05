using System.ComponentModel.DataAnnotations;
using Wishlist.Data.Models.Base;
using Wishlist.Data.Models.Enums;

namespace Wishlist.Data.Models;

public class UserEntity : EntityBase
{
    [MaxLength(50)]
    public string Name { get; set; } = default!;
    
    public required UserSource Source { get; set; }
    
    [MaxLength(200)]
    public string? ExternalId { get; set; }
    
    [MaxLength(100)]
    public string? Email { get; set; }
    
    [MaxLength(50)]
    public string? Password { get; set; }
}