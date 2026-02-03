using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addconcepttoschoolversion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ConstructionConceptId",
                table: "SchoolProjectVersions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SchoolProjectVersions_ConstructionConceptId",
                table: "SchoolProjectVersions",
                column: "ConstructionConceptId");

            migrationBuilder.AddForeignKey(
                name: "FK_SchoolProjectVersions_ConstructionConcepts_ConstructionConceptId",
                table: "SchoolProjectVersions",
                column: "ConstructionConceptId",
                principalTable: "ConstructionConcepts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SchoolProjectVersions_ConstructionConcepts_ConstructionConceptId",
                table: "SchoolProjectVersions");

            migrationBuilder.DropIndex(
                name: "IX_SchoolProjectVersions_ConstructionConceptId",
                table: "SchoolProjectVersions");

            migrationBuilder.DropColumn(
                name: "ConstructionConceptId",
                table: "SchoolProjectVersions");
        }
    }
}
