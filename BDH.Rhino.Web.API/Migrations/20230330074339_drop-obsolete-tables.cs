using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class dropobsoletetables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectBaseGeometries_BaseGeometryId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectVersions_ProjectVersionGeometries_VersionGeometryId",
                table: "ProjectVersions");

            migrationBuilder.DropTable(
                name: "ProjectBaseGeometries");

            migrationBuilder.DropTable(
                name: "ProjectVersionGeometries");

            migrationBuilder.DropIndex(
                name: "IX_ProjectVersions_VersionGeometryId",
                table: "ProjectVersions");

            migrationBuilder.DropIndex(
                name: "IX_Projects_BaseGeometryId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Assets",
                table: "ProjectVersions");

            migrationBuilder.DropColumn(
                name: "Boxes",
                table: "ProjectVersions");

            migrationBuilder.DropColumn(
                name: "Tiles",
                table: "ProjectVersions");

            migrationBuilder.DropColumn(
                name: "VersionGeometryId",
                table: "ProjectVersions");

            migrationBuilder.DropColumn(
                name: "BaseGeometryId",
                table: "Projects");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Assets",
                table: "ProjectVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Boxes",
                table: "ProjectVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tiles",
                table: "ProjectVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VersionGeometryId",
                table: "ProjectVersions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BaseGeometryId",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProjectBaseGeometries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ExistingBuildings = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectBaseGeometries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectVersionGeometries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectVersionGeometries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectVersions_VersionGeometryId",
                table: "ProjectVersions",
                column: "VersionGeometryId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_BaseGeometryId",
                table: "Projects",
                column: "BaseGeometryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectBaseGeometries_BaseGeometryId",
                table: "Projects",
                column: "BaseGeometryId",
                principalTable: "ProjectBaseGeometries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectVersions_ProjectVersionGeometries_VersionGeometryId",
                table: "ProjectVersions",
                column: "VersionGeometryId",
                principalTable: "ProjectVersionGeometries",
                principalColumn: "Id");
        }
    }
}
