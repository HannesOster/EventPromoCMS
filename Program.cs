using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using EventCMS.Data;
using EventCMS.Models;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("events") ?? "Data Source=events.db";
builder.Services.AddDbContext<EventDbContext>(options => options.UseSqlite(connectionString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "events API", Description = "Event API", Version = "v1" });
});

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      builder =>
      {
          builder.WithOrigins("http://localhost:3000")
                 .AllowAnyHeader()
                 .AllowAnyMethod();
          builder.WithOrigins("http://localhost:4000")
                .AllowAnyHeader()
                .WithMethods("GET");
      });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "events API V1");
});
app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/events", async (EventDbContext db) => await db.Events.ToListAsync());

app.MapPost("/events", async (EventDbContext db, Event @event) =>
{
    await db.Events.AddAsync(@event);
    await db.SaveChangesAsync();
    return Results.Created($"/events/{@event.Id}", @event);
});

app.MapPut("/events/{id}", async (EventDbContext db, Event updateEvent, int id) =>
{
    var eventItem = await db.Events.FindAsync(id);
    if (eventItem is null) return Results.NotFound();

    eventItem.Name = updateEvent.Name;
    eventItem.Description = updateEvent.Description;
    eventItem.SubDescription = updateEvent.SubDescription;
    eventItem.Price = updateEvent.Price;
    eventItem.ImageUrl = updateEvent.ImageUrl;

    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.MapDelete("/events/{id}", async (EventDbContext db, int id) =>
{
    var eventItem = await db.Events.FindAsync(id);
    if (eventItem is null)
    {
        return Results.NotFound();
    }
    db.Events.Remove(eventItem);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.Run();
