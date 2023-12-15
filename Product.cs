using Microsoft.EntityFrameworkCore;

namespace ProductStore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price{ get; set; }
    }
    class ProductDb : DbContext
    {
        public ProductDb(DbContextOptions options) : base(options) { }
        public DbSet<Product> Products { get; set; } = null!;
    }
}