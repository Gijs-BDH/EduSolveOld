using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addedcompatibility : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVersion2Compatible",
                table: "ProjectVersions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVersion2Compatible",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVersion2Compatible",
                table: "ProjectVersions");

            migrationBuilder.DropColumn(
                name: "IsVersion2Compatible",
                table: "Projects");
        }
    }
}
