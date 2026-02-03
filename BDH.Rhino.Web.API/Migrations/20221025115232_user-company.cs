using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class usercompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Users",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyName",
                table: "Users",
                column: "CompanyName");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompanyName",
                table: "Users",
                column: "CompanyName",
                principalTable: "Companies",
                principalColumn: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompanyName",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_CompanyName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Users");
        }
    }
}
