using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaxiGestion.Migrations
{
    public partial class FixDA20ToDA21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DA20Config");

            migrationBuilder.CreateTable(
                name: "DA21Config",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    PeriodeComptaDateDebut = table.Column<DateTime>(nullable: false),
                    PeriodeComptaDateFin = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DA21Config", x => x.NoClient);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DA21Config");

            migrationBuilder.CreateTable(
                name: "DA20Config",
                columns: table => new
                {
                    NoClient = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PeriodeComptaDateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PeriodeComptaDateFin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DA20Config", x => x.NoClient);
                });
        }
    }
}
