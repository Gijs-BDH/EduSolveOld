using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class ChangeToIncludeEpcBeng : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BvoPerUnit",
                table: "OpenBouwConcepten",
                newName: "MeerprijsEPC");

            migrationBuilder.AddColumn<decimal>(
                name: "MeerprijsBENG",
                table: "OpenBouwConcepten",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeerprijsBENG",
                table: "OpenBouwConcepten");

            migrationBuilder.RenameColumn(
                name: "MeerprijsEPC",
                table: "OpenBouwConcepten",
                newName: "BvoPerUnit");
        }
    }
}
