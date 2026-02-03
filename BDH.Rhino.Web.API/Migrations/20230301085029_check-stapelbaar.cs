using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class checkstapelbaar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Stapelbaar",
                table: "UserProducts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stapelbaar",
                table: "UserProducts");
        }
    }
}
