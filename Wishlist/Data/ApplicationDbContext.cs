using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;

namespace Wishlist.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = default!;
    public DbSet<UserConfirmationCode> UserConfirmationCodes { get; set; } = default!;
    public DbSet<Image> Images { get; set; } = default!;
    public DbSet<UserList> UserLists { get; set; } = default!;
    public DbSet<UserListItem> UserListItems { get; set; } = default!;
    
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
#if DEBUG
    // used for migration generating
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=WishlistDB;Username=postgres;Password=postgres");
    }
#endif
}