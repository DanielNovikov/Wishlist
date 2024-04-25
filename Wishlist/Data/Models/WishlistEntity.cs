using System.ComponentModel.DataAnnotations;
using Wishlist.Data.Models.Base;

namespace Wishlist.Data.Models;

public class WishlistEntity : EntityBase
{
    [MaxLength(100)]
    public required string Name { get; set; }
    
    [MaxLength(8)]
    public required string PublicId { get; set; }
    
    public int UserId { get; set; }
    public UserEntity User { get; set; } = default!;
    
    public List<WishlistItemEntity> Items { get; set; } = default!;
}