﻿using Microsoft.EntityFrameworkCore;
using Wishlist.Data.Models;

namespace Wishlist.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; } = default!;
    public DbSet<ImageEntity> Images { get; set; } = default!;
    public DbSet<WishlistEntity> Wishlists { get; set; } = default!;
    public DbSet<WishlistItemEntity> WishlistItems { get; set; } = default!;
    
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<WishlistItemEntity>()
            .HasOne(x => x.Image)
            .WithMany()
            .HasForeignKey(x => x.ImageId)
            .OnDelete(DeleteBehavior.SetNull);
    }

#if DEBUG
    // used for migration generating
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=WishlistDB;Username=postgres;Password=postgres");
    }
#endif
}