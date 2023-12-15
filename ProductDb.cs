using ProductStore.Models;
using Microsoft.EntityFrameworkCore;

namespace ProductStore.Data;

public class ProductDb : DbContext
{
    public ProductDb(DbContextOptions options) : base(options) { }
    public DbSet<Product> Products { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Football", Price = 50 });
    }
}