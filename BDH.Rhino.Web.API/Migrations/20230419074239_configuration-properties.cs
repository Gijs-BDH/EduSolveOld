using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class configurationproperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AboveIsIndifferent",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "AllowedOnLowestLevel",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "BelowIsIndifferent",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<int>(
                name: "ColumnSpan",
                table: "BuildingConceptConfigurations",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<bool>(
                name: "EmptySpaceAllowedAbove",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmptySpaceAllowedLeft",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmptySpaceAllowedRight",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "LeftIsIndifferent",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "RightIsIndifferent",
                table: "BuildingConceptConfigurations",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<int>(
                name: "RowSpan",
                table: "BuildingConceptConfigurations",
                type: "int",
                nullable: false,
                defaultValue: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboveIsIndifferent",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "AllowedOnLowestLevel",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "BelowIsIndifferent",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "ColumnSpan",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "EmptySpaceAllowedAbove",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "EmptySpaceAllowedLeft",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "EmptySpaceAllowedRight",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "LeftIsIndifferent",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "RightIsIndifferent",
                table: "BuildingConceptConfigurations");

            migrationBuilder.DropColumn(
                name: "RowSpan",
                table: "BuildingConceptConfigurations");
        }
    }
}
