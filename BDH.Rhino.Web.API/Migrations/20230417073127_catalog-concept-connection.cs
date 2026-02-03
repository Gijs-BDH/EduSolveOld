using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class catalogconceptconnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CatalogId",
                table: "Bouwconcepten",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Bouwconcepten_CatalogId",
                table: "Bouwconcepten",
                column: "CatalogId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bouwconcepten_BuildingConceptCatalogs_CatalogId",
                table: "Bouwconcepten",
                column: "CatalogId",
                principalTable: "BuildingConceptCatalogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bouwconcepten_BuildingConceptCatalogs_CatalogId",
                table: "Bouwconcepten");

            migrationBuilder.DropIndex(
                name: "IX_Bouwconcepten_CatalogId",
                table: "Bouwconcepten");

            migrationBuilder.DropColumn(
                name: "CatalogId",
                table: "Bouwconcepten");
        }
    }
}
