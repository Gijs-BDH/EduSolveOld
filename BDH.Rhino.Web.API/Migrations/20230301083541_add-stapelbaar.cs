using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addstapelbaar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "BasePolygon",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Stapelbaar",
                table: "OpenBouwConcepten",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stapelbaar",
                table: "OpenBouwConcepten");

            migrationBuilder.AlterColumn<string>(
                name: "BasePolygon",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
