using Microsoft.EntityFrameworkCore;

namespace EventCMS.Models
{
    public class Event
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SubDescription { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
