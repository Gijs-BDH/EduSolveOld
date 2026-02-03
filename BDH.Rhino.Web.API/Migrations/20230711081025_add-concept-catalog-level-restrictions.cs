using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addconceptcataloglevelrestrictions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LevelsFrom",
                table: "BuildingConceptCatalogTransformations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LevelsTo",
                table: "BuildingConceptCatalogTransformations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LevelsFrom",
                table: "BuildingConceptCatalogTransformations");

            migrationBuilder.DropColumn(
                name: "LevelsTo",
                table: "BuildingConceptCatalogTransformations");
        }
    }
}
