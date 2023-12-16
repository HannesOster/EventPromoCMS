using Microsoft.EntityFrameworkCore;
using ProductStore.Data;
using Microsoft.OpenApi.Models;
using ProductStore.Models;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("products") ?? "Data Source=products.db";
builder.Services.AddDbContext<ProductDb>(options => options.UseSqlite(connectionString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "products API", Description = "Product product", Version = "v1" });
});
// 1) define a unique string
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      builder =>
      {
        builder.WithOrigins("http://localhost:3000")
       .AllowAnyHeader()
       .AllowAnyMethod();
      });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "products API V1");
});
// 3) use the capability
app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/products", async (ProductDb db) => await db.Products.ToListAsync());

app.MapPost("/products", async (ProductDb db, Product product) =>
{
    await db.Products.AddAsync(product);
    await db.SaveChangesAsync();
    return Results.Created($"/products/{product.Id}", product);
});

app.MapPut("/products/{id}", async (ProductDb db, Product updateProduct, int id) =>
{
    var productItem = await db.Products.FindAsync(id);
    if (productItem is null) return Results.NotFound();
    productItem.Name = updateProduct.Name;
    productItem.Price = updateProduct.Price;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/products/{id}", async (ProductDb db, int id) =>
{
    var todo = await db.Products.FindAsync(id);
    if (todo is null)
    {
        return Results.NotFound();
    }
    db.Products.Remove(todo);
    await db.SaveChangesAsync();
    return Results.Ok();
});
app.Run();
