using Wishlist.Data.Models.Base;

namespace Wishlist.Data.Models;

public class ImageEntity : EntityBase
{
    public required string Path { get; set; }
}