using System.ComponentModel.DataAnnotations;

namespace Wishlist.Data.Models;

public class UserConfirmationCode : EntityBase
{
    [MaxLength(4)]
    public required string Code { get; set; }
    
    public string? Email { get; set; }
    
    public int? UserId { get; set; }
    public User? User { get; set; }
}