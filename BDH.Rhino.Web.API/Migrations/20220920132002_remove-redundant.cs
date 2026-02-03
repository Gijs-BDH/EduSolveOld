using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class removeredundant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Functie",
                table: "UserProducts");

            migrationBuilder.DropColumn(
                name: "Marktwaarde",
                table: "UserProducts");

            migrationBuilder.DropColumn(
                name: "Producent",
                table: "UserProducts");

            migrationBuilder.RenameColumn(
                name: "ProductieKosten",
                table: "UserProducts",
                newName: "PricePerUnit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PricePerUnit",
                table: "UserProducts",
                newName: "ProductieKosten");

            migrationBuilder.AddColumn<string>(
                name: "Functie",
                table: "UserProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Marktwaarde",
                table: "UserProducts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Producent",
                table: "UserProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
