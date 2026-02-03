using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class catalogconfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AllowedColumnsFrom",
                table: "BuildingConceptCatalogs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AllowedColumnsTo",
                table: "BuildingConceptCatalogs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AllowedRowsFrom",
                table: "BuildingConceptCatalogs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AllowedRowsTo",
                table: "BuildingConceptCatalogs",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowedColumnsFrom",
                table: "BuildingConceptCatalogs");

            migrationBuilder.DropColumn(
                name: "AllowedColumnsTo",
                table: "BuildingConceptCatalogs");

            migrationBuilder.DropColumn(
                name: "AllowedRowsFrom",
                table: "BuildingConceptCatalogs");

            migrationBuilder.DropColumn(
                name: "AllowedRowsTo",
                table: "BuildingConceptCatalogs");
        }
    }
}
