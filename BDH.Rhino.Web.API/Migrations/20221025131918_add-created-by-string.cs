using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addcreatedbystring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Projects");
        }
    }
}
