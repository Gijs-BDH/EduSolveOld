using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addedcreatedby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedByEmailAdress",
                table: "Bouwconcepten",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Bouwconcepten_CreatedByEmailAdress",
                table: "Bouwconcepten",
                column: "CreatedByEmailAdress");

            migrationBuilder.AddForeignKey(
                name: "FK_Bouwconcepten_Users_CreatedByEmailAdress",
                table: "Bouwconcepten",
                column: "CreatedByEmailAdress",
                principalTable: "Users",
                principalColumn: "EmailAdress",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bouwconcepten_Users_CreatedByEmailAdress",
                table: "Bouwconcepten");

            migrationBuilder.DropIndex(
                name: "IX_Bouwconcepten_CreatedByEmailAdress",
                table: "Bouwconcepten");

            migrationBuilder.DropColumn(
                name: "CreatedByEmailAdress",
                table: "Bouwconcepten");
        }
    }
}
