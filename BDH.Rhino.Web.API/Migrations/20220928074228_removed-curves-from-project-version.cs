using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class removedcurvesfromprojectversion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Curves",
                table: "ProjectVersions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Curves",
                table: "ProjectVersions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
