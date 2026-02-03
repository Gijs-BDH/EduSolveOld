using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class configurationedgesconverter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AllowedAbove",
                table: "BuildingConceptConfigurations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AllowedBelow",
                table: "BuildingConceptConfigurations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AllowedLeft",
                table: "BuildingConceptConfigurations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AllowedRight",
                table: "BuildingConceptConfigurations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowedAbove",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "AllowedBelow",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "AllowedLeft",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "AllowedRight",
                table: "BuildingConceptConfigurations");
        }
    }
}
