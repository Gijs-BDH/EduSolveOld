using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addedprojectversiontransformations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuildingConceptTransformations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BouwconceptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LocationX = table.Column<double>(type: "float", nullable: false),
                    LocationY = table.Column<double>(type: "float", nullable: false),
                    Rotation = table.Column<double>(type: "float", nullable: false),
                    ProjectVersionId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingConceptTransformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildingConceptTransformations_ProjectVersions_ProjectVersionId",
                        column: x => x.ProjectVersionId,
                        principalTable: "ProjectVersions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GenericMassTransformations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BouwconceptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LocationX = table.Column<double>(type: "float", nullable: false),
                    LocationY = table.Column<double>(type: "float", nullable: false),
                    Rotation = table.Column<double>(type: "float", nullable: false),
                    Width = table.Column<double>(type: "float", nullable: false),
                    Height = table.Column<double>(type: "float", nullable: false),
                    Depth = table.Column<double>(type: "float", nullable: false),
                    ProjectVersionId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericMassTransformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericMassTransformations_ProjectVersions_ProjectVersionId",
                        column: x => x.ProjectVersionId,
                        principalTable: "ProjectVersions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingConceptTransformations_ProjectVersionId",
                table: "BuildingConceptTransformations",
                column: "ProjectVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericMassTransformations_ProjectVersionId",
                table: "GenericMassTransformations",
                column: "ProjectVersionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingConceptTransformations");

            migrationBuilder.DropTable(
                name: "GenericMassTransformations");
        }
    }
}
