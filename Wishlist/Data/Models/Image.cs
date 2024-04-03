using Wishlist.Data.Models.Base;

namespace Wishlist.Data.Models;

public class Image : EntityBase
{
    public required string Path { get; set; }
}