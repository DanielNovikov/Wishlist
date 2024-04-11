using System.ComponentModel.DataAnnotations;
using Wishlist.Data.Models.Base;

namespace Wishlist.Data.Models;

public class ImageEntity : EntityBase
{
    [MaxLength(200)]
    public required string Path { get; set; }
}