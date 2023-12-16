using EventCMS.Models;
using Microsoft.EntityFrameworkCore;

namespace EventCMS.Data
{
    public class EventDbContext : DbContext
    {
        public EventDbContext(DbContextOptions<EventDbContext> options) : base(options) { }

        public DbSet<Event> Events { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>().HasData(
                new Event
                {
                    Id = 1,
                    Name = "Sample Event",
                    Description = "This is a sample event.",
                    SubDescription = "You can put whatever information here.",
                    Price = 50.0m,
                    ImageUrl = "https://example.com/sample-image.jpg"
                }) ;
        }
    }
}
