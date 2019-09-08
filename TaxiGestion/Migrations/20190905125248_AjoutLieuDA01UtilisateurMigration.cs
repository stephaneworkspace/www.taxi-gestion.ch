using Microsoft.EntityFrameworkCore.Migrations;

namespace TaxiGestion.Migrations
{
    public partial class AjoutLieuDA01UtilisateurMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lieu",
                table: "DA10Client",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lieu",
                table: "DA10Client");
        }
    }
}
