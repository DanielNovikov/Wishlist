namespace Wishlist.Data.Models.Base;

public abstract class EntityBase
{
    public int Id { get; set; }

    public DateTime Created { get; set; } = DateTime.UtcNow;
}