using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BDH.Rhino.Web.API.Migrations
{
    public partial class addprojectclusters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SchoolProjectId",
                table: "SchoolProjectVersionClusters",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SchoolProjectVersionClusters_SchoolProjectId",
                table: "SchoolProjectVersionClusters",
                column: "SchoolProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_SchoolProjectVersionClusters_SchoolProjects_SchoolProjectId",
                table: "SchoolProjectVersionClusters",
                column: "SchoolProjectId",
                principalTable: "SchoolProjects",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SchoolProjectVersionClusters_SchoolProjects_SchoolProjectId",
                table: "SchoolProjectVersionClusters");

            migrationBuilder.DropIndex(
                name: "IX_SchoolProjectVersionClusters_SchoolProjectId",
                table: "SchoolProjectVersionClusters");

            migrationBuilder.DropColumn(
                name: "SchoolProjectId",
                table: "SchoolProjectVersionClusters");
        }
    }
}
