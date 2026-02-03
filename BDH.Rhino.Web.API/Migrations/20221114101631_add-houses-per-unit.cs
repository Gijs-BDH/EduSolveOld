using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addhousesperunit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WoningenPerUnit",
                table: "UserProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WoningenPerUnit",
                table: "OpenBouwConcepten",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WoningenPerUnit",
                table: "UserProducts");

            migrationBuilder.DropColumn(
                name: "WoningenPerUnit",
                table: "OpenBouwConcepten");
        }
    }
}
