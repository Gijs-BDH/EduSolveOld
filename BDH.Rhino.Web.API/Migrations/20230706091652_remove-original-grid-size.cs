using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class removeoriginalgridsize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GridSize",
                table: "SchoolProjectVersions");

            migrationBuilder.DropColumn(
                name: "GridSizeY",
                table: "SchoolProjectVersions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "GridSize",
                table: "SchoolProjectVersions",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "GridSizeY",
                table: "SchoolProjectVersions",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
