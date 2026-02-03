using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class allownullinproject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectBaseGeometries_BaseGeometryId",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "BasePolygon",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "BaseGeometryId",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectBaseGeometries_BaseGeometryId",
                table: "Projects",
                column: "BaseGeometryId",
                principalTable: "ProjectBaseGeometries",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectBaseGeometries_BaseGeometryId",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "BasePolygon",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BaseGeometryId",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectBaseGeometries_BaseGeometryId",
                table: "Projects",
                column: "BaseGeometryId",
                principalTable: "ProjectBaseGeometries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
