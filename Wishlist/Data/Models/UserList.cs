using System.ComponentModel.DataAnnotations;

namespace Wishlist.Data.Models;

public class UserList : EntityBase
{
    [MaxLength(100)]
    public required string Name { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; } = default!;
    
    public List<UserListItem> Items { get; set; } = default!;
}