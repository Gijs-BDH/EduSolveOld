using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class catalogtransformationsinversion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectVersionId",
                table: "BuildingConceptCatalogTransformations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BuildingConceptCatalogTransformations_ProjectVersionId",
                table: "BuildingConceptCatalogTransformations",
                column: "ProjectVersionId");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingConceptCatalogTransformations_ProjectVersions_ProjectVersionId",
                table: "BuildingConceptCatalogTransformations",
                column: "ProjectVersionId",
                principalTable: "ProjectVersions",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingConceptCatalogTransformations_ProjectVersions_ProjectVersionId",
                table: "BuildingConceptCatalogTransformations");

            migrationBuilder.DropIndex(
                name: "IX_BuildingConceptCatalogTransformations_ProjectVersionId",
                table: "BuildingConceptCatalogTransformations");

            migrationBuilder.DropColumn(
                name: "ProjectVersionId",
                table: "BuildingConceptCatalogTransformations");
        }
    }
}
