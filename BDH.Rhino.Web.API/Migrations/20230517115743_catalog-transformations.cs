using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class catalogtransformations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuildingConceptCatalogTransformations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingConceptCatalogId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartPointX = table.Column<double>(type: "float", nullable: false),
                    StartPointY = table.Column<double>(type: "float", nullable: false),
                    EndPointX = table.Column<double>(type: "float", nullable: false),
                    EndPointY = table.Column<double>(type: "float", nullable: false),
                    UsedSeed = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingConceptCatalogTransformations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingConceptCatalogTransformations");
        }
    }
}
