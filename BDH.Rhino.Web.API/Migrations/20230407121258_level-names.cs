using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class levelnames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MinLevel",
                table: "SchoolProjectVersionClusters",
                newName: "LowestLevel");

            migrationBuilder.RenameColumn(
                name: "MaxLevel",
                table: "SchoolProjectVersionClusters",
                newName: "HighestLevel");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LowestLevel",
                table: "SchoolProjectVersionClusters",
                newName: "MinLevel");

            migrationBuilder.RenameColumn(
                name: "HighestLevel",
                table: "SchoolProjectVersionClusters",
                newName: "MaxLevel");
        }
    }
}
