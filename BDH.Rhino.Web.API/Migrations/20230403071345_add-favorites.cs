using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addfavorites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFavorites",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserEmailAdress = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BouwconceptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFavorites_Bouwconcepten_BouwconceptId",
                        column: x => x.BouwconceptId,
                        principalTable: "Bouwconcepten",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFavorites_Users_UserEmailAdress",
                        column: x => x.UserEmailAdress,
                        principalTable: "Users",
                        principalColumn: "EmailAdress",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFavorites_BouwconceptId",
                table: "UserFavorites",
                column: "BouwconceptId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavorites_UserEmailAdress",
                table: "UserFavorites",
                column: "UserEmailAdress");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFavorites");
        }
    }
}
