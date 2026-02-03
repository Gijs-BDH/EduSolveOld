using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class schoolpersistence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SchoolProjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BasePolygon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerEmailAdress = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolProjects_Users_OwnerEmailAdress",
                        column: x => x.OwnerEmailAdress,
                        principalTable: "Users",
                        principalColumn: "EmailAdress",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SchoolProjectVersions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GridSize = table.Column<double>(type: "float", nullable: false),
                    GridRotation = table.Column<double>(type: "float", nullable: false),
                    GridTranslation = table.Column<double>(type: "float", nullable: false),
                    GridHeight = table.Column<double>(type: "float", nullable: false),
                    Obstacles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Favorites = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolProjectVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolProjectVersions_SchoolProjects_SchoolProjectId",
                        column: x => x.SchoolProjectId,
                        principalTable: "SchoolProjects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SchoolProjectVersionClusters",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BVO = table.Column<double>(type: "float", nullable: false),
                    MinLevel = table.Column<int>(type: "int", nullable: false),
                    MaxLevel = table.Column<int>(type: "int", nullable: false),
                    Levels = table.Column<int>(type: "int", nullable: false),
                    FixedPoints = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolProjectVersionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolProjectVersionClusters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolProjectVersionClusters_SchoolProjectVersions_SchoolProjectVersionId",
                        column: x => x.SchoolProjectVersionId,
                        principalTable: "SchoolProjectVersions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SchoolProjects_OwnerEmailAdress",
                table: "SchoolProjects",
                column: "OwnerEmailAdress");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolProjectVersionClusters_SchoolProjectVersionId",
                table: "SchoolProjectVersionClusters",
                column: "SchoolProjectVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolProjectVersions_SchoolProjectId",
                table: "SchoolProjectVersions",
                column: "SchoolProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolProjectVersionClusters");

            migrationBuilder.DropTable(
                name: "SchoolProjectVersions");

            migrationBuilder.DropTable(
                name: "SchoolProjects");
        }
    }
}
