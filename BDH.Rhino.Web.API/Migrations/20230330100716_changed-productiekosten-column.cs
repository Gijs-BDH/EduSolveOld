using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class changedproductiekostencolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpenBouwConcepten");

            migrationBuilder.DropTable(
                name: "UserProducts");

            migrationBuilder.DropTable(
                name: "BuildingConceptGeometries");

            migrationBuilder.DropTable(
                name: "UserProductGeometries");

            migrationBuilder.RenameColumn(
                name: "PricePerUnit",
                table: "Bouwconcepten",
                newName: "ProductieKostenPerUnit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductieKostenPerUnit",
                table: "Bouwconcepten",
                newName: "PricePerUnit");

            migrationBuilder.CreateTable(
                name: "BuildingConceptGeometries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingConceptGeometries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserProductGeometries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProductGeometries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenBouwConcepten",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GeometryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BouwkostenPerBVO = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    BvoPerUnit = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    M3PerUnit = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    MeerprijsBENG = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    MeerprijsEPC = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stapelbaar = table.Column<bool>(type: "bit", nullable: false),
                    WoningenPerUnit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenBouwConcepten", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenBouwConcepten_BuildingConceptGeometries_GeometryId",
                        column: x => x.GeometryId,
                        principalTable: "BuildingConceptGeometries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProducts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GeometryId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BvoPerUnit = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    M3PerUnit = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    MeerprijsBENG = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    MeerprijsEPC = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PricePerUnit = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Stapelbaar = table.Column<bool>(type: "bit", nullable: false),
                    UserEmailAdress = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    WoningenPerUnit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProducts_UserProductGeometries_GeometryId",
                        column: x => x.GeometryId,
                        principalTable: "UserProductGeometries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProducts_Users_UserEmailAdress",
                        column: x => x.UserEmailAdress,
                        principalTable: "Users",
                        principalColumn: "EmailAdress");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpenBouwConcepten_GeometryId",
                table: "OpenBouwConcepten",
                column: "GeometryId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProducts_GeometryId",
                table: "UserProducts",
                column: "GeometryId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProducts_UserEmailAdress",
                table: "UserProducts",
                column: "UserEmailAdress");
        }
    }
}
