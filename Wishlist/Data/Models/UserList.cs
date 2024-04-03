using System.ComponentModel.DataAnnotations;
using Wishlist.Data.Models.Base;

namespace Wishlist.Data.Models;

public class UserList : EntityBase
{
    [MaxLength(100)]
    public required string Name { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; } = default!;
    
    public List<UserListItem> Items { get; set; } = default!;
}