using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addconstructionconcept : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConstructionConceptProducers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionConceptProducers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ConstructionConcepts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpanWidth = table.Column<double>(type: "float", nullable: false),
                    SpanLength = table.Column<double>(type: "float", nullable: false),
                    ProducerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionConcepts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConstructionConcepts_ConstructionConceptProducers_ProducerId",
                        column: x => x.ProducerId,
                        principalTable: "ConstructionConceptProducers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionConcepts_ProducerId",
                table: "ConstructionConcepts",
                column: "ProducerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConstructionConcepts");

            migrationBuilder.DropTable(
                name: "ConstructionConceptProducers");
        }
    }
}
