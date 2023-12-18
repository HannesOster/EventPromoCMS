using Microsoft.EntityFrameworkCore.Migrations;

namespace EventCMS.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "events",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    SubDescription = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<decimal>(type: "REAL", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "events",
                columns: new[] { "Id", "Name", "Description", "SubDescription", "Price", "ImageUrl" },
                values: new object[] { "1", "Sample Event", "This is a sample event.", "Sub Description", 50.0m, "https://example.com/sample-image.jpg" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "events");
        }
    }
}
