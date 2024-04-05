using Wishlist.Data.Models.Base;
using Wishlist.Data.Models.Enums;

namespace Wishlist.Data.Models;

public class WishlistItemEntity : EntityBase
{
    public required string Title { get; set; }
    
    public string? Description { get; set; }
    
    public string? Url { get; set; }
    
    public int? Price { get; set; }
    
    public WishlistItemPriority Priority { get; set; }
    
    public int? ImageId { get; set; }
    public ImageEntity? Image { get; set; }
    
    public int WishlistId { get; set; }
    public WishlistEntity Wishlist { get; set; } = default!;
}