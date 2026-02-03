using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class ChangeToBouwkostenPerBvo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PricePerUnit",
                table: "OpenBouwConcepten",
                newName: "BouwkostenPerBVO");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BouwkostenPerBVO",
                table: "OpenBouwConcepten",
                newName: "PricePerUnit");
        }
    }
}
