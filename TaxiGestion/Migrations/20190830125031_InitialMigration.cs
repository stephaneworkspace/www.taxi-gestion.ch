using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaxiGestion.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DC01Classe",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoClasse = table.Column<int>(nullable: false),
                    Texte = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC01Classe", x => new { x.NoClient, x.NoClasse });
                });

            migrationBuilder.CreateTable(
                name: "DC02Groupe",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoGroupe = table.Column<int>(nullable: false),
                    Texte = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC02Groupe", x => new { x.NoClient, x.NoGroupe });
                });

            migrationBuilder.CreateTable(
                name: "DC03SousGroupe",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoSousGroupe = table.Column<int>(nullable: false),
                    Texte = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC03SousGroupe", x => new { x.NoClient, x.NoSousGroupe });
                });

            migrationBuilder.CreateTable(
                name: "DC20Journal",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoJournal = table.Column<int>(nullable: false),
                    DateJournalisation = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC20Journal", x => new { x.NoClient, x.NoJournal });
                });

            migrationBuilder.CreateTable(
                name: "DC31EcritureCollectiveJournal",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoUtilisateur = table.Column<int>(nullable: false),
                    NoEcritureCollectiveJournal = table.Column<int>(nullable: false),
                    DateEcriture = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC31EcritureCollectiveJournal", x => new { x.NoClient, x.NoUtilisateur, x.NoEcritureCollectiveJournal });
                });

            migrationBuilder.CreateTable(
                name: "DC10Compte",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoCompte = table.Column<int>(nullable: false),
                    NoClasse = table.Column<int>(nullable: false),
                    NoGroupe = table.Column<int>(nullable: false),
                    NoSousGroupe = table.Column<int>(nullable: false),
                    Texte = table.Column<string>(nullable: true),
                    SoldeAp = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC10Compte", x => new { x.NoClient, x.NoCompte });
                    table.ForeignKey(
                        name: "FK_DC10Compte_DC01Classe_NoClient_NoClasse",
                        columns: x => new { x.NoClient, x.NoClasse },
                        principalTable: "DC01Classe",
                        principalColumns: new[] { "NoClient", "NoClasse" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DC10Compte_DC02Groupe_NoClient_NoGroupe",
                        columns: x => new { x.NoClient, x.NoGroupe },
                        principalTable: "DC02Groupe",
                        principalColumns: new[] { "NoClient", "NoGroupe" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DC10Compte_DC03SousGroupe_NoClient_NoSousGroupe",
                        columns: x => new { x.NoClient, x.NoSousGroupe },
                        principalTable: "DC03SousGroupe",
                        principalColumns: new[] { "NoClient", "NoSousGroupe" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DC22EcritureCollective",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoEcritureCollective = table.Column<int>(nullable: false),
                    DateEcriture = table.Column<DateTime>(nullable: false),
                    NoJournal = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC22EcritureCollective", x => new { x.NoClient, x.NoEcritureCollective });
                    table.ForeignKey(
                        name: "FK_DC22EcritureCollective_DC20Journal_NoClient_NoJournal",
                        columns: x => new { x.NoClient, x.NoJournal },
                        principalTable: "DC20Journal",
                        principalColumns: new[] { "NoClient", "NoJournal" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DC30EcritureJournal",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoUtilisateur = table.Column<int>(nullable: false),
                    NoEcritureCollectiveJournal = table.Column<int>(nullable: false),
                    NoEcritureJournal = table.Column<int>(nullable: false),
                    NoCompteDebit = table.Column<int>(nullable: true),
                    NoCompteCredit = table.Column<int>(nullable: true),
                    NoPiece = table.Column<int>(nullable: false),
                    Libelle1 = table.Column<string>(nullable: true),
                    Libelle2 = table.Column<string>(nullable: true),
                    Montant = table.Column<double>(nullable: false),
                    SwAutomatique = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC30EcritureJournal", x => new { x.NoClient, x.NoUtilisateur, x.NoEcritureCollectiveJournal, x.NoEcritureJournal });
                    table.ForeignKey(
                        name: "FK_DC30EcritureJournal_DC10Compte_NoClient_NoCompteCredit",
                        columns: x => new { x.NoClient, x.NoCompteCredit },
                        principalTable: "DC10Compte",
                        principalColumns: new[] { "NoClient", "NoCompte" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DC30EcritureJournal_DC10Compte_NoClient_NoCompteDebit",
                        columns: x => new { x.NoClient, x.NoCompteDebit },
                        principalTable: "DC10Compte",
                        principalColumns: new[] { "NoClient", "NoCompte" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DC30EcritureJournal_DC31EcritureCollectiveJournal_NoClient_NoUtilisateur_NoEcritureCollectiveJournal",
                        columns: x => new { x.NoClient, x.NoUtilisateur, x.NoEcritureCollectiveJournal },
                        principalTable: "DC31EcritureCollectiveJournal",
                        principalColumns: new[] { "NoClient", "NoUtilisateur", "NoEcritureCollectiveJournal" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DC21Ecriture",
                columns: table => new
                {
                    NoClient = table.Column<int>(nullable: false),
                    NoEcritureCollective = table.Column<int>(nullable: false),
                    NoEcriture = table.Column<int>(nullable: false),
                    NoCompte = table.Column<int>(nullable: false),
                    ContrePartie = table.Column<int>(nullable: true),
                    NoPiece = table.Column<int>(nullable: false),
                    MontantDebit = table.Column<double>(nullable: false),
                    MontantCredit = table.Column<double>(nullable: false),
                    Libelle1 = table.Column<string>(nullable: true),
                    Libelle2 = table.Column<string>(nullable: true),
                    SwImpressionExtourne = table.Column<bool>(nullable: false),
                    NoJournal = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DC21Ecriture", x => new { x.NoClient, x.NoEcritureCollective, x.NoEcriture });
                    table.ForeignKey(
                        name: "FK_DC21Ecriture_DC10Compte_NoClient_ContrePartie",
                        columns: x => new { x.NoClient, x.ContrePartie },
                        principalTable: "DC10Compte",
                        principalColumns: new[] { "NoClient", "NoCompte" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DC21Ecriture_DC10Compte_NoClient_NoCompte",
                        columns: x => new { x.NoClient, x.NoCompte },
                        principalTable: "DC10Compte",
                        principalColumns: new[] { "NoClient", "NoCompte" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DC21Ecriture_DC22EcritureCollective_NoClient_NoEcritureCollective",
                        columns: x => new { x.NoClient, x.NoEcritureCollective },
                        principalTable: "DC22EcritureCollective",
                        principalColumns: new[] { "NoClient", "NoEcritureCollective" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DC21Ecriture_DC20Journal_NoClient_NoJournal",
                        columns: x => new { x.NoClient, x.NoJournal },
                        principalTable: "DC20Journal",
                        principalColumns: new[] { "NoClient", "NoJournal" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DA10Client",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UtilisateurAdminId = table.Column<int>(nullable: true),
                    NomDeFamille = table.Column<string>(nullable: true),
                    Prenom = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    CodePostal = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DA10Client", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DA01Utilisateur",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdClient = table.Column<int>(nullable: false),
                    SwActiveClient = table.Column<bool>(nullable: false),
                    NomUtilisateur = table.Column<string>(nullable: true),
                    MotDePasseHash = table.Column<byte[]>(nullable: true),
                    MotDePasseSalt = table.Column<byte[]>(nullable: true),
                    EMail = table.Column<string>(nullable: true),
                    MotDePasseEMailConfirmation = table.Column<string>(nullable: true),
                    SwEMailConfirmation = table.Column<bool>(nullable: false),
                    SwActive = table.Column<bool>(nullable: false),
                    DateCreation = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DA01Utilisateur", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DA01Utilisateur_DA10Client_IdClient",
                        column: x => x.IdClient,
                        principalTable: "DA10Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DA01Utilisateur_IdClient",
                table: "DA01Utilisateur",
                column: "IdClient");

            migrationBuilder.CreateIndex(
                name: "IX_DA10Client_UtilisateurAdminId",
                table: "DA10Client",
                column: "UtilisateurAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_DC10Compte_NoClient_NoClasse",
                table: "DC10Compte",
                columns: new[] { "NoClient", "NoClasse" });

            migrationBuilder.CreateIndex(
                name: "IX_DC10Compte_NoClient_NoGroupe",
                table: "DC10Compte",
                columns: new[] { "NoClient", "NoGroupe" });

            migrationBuilder.CreateIndex(
                name: "IX_DC10Compte_NoClient_NoSousGroupe",
                table: "DC10Compte",
                columns: new[] { "NoClient", "NoSousGroupe" });

            migrationBuilder.CreateIndex(
                name: "IX_DC21Ecriture_NoClient_ContrePartie",
                table: "DC21Ecriture",
                columns: new[] { "NoClient", "ContrePartie" });

            migrationBuilder.CreateIndex(
                name: "IX_DC21Ecriture_NoClient_NoCompte",
                table: "DC21Ecriture",
                columns: new[] { "NoClient", "NoCompte" });

            migrationBuilder.CreateIndex(
                name: "IX_DC21Ecriture_NoClient_NoJournal",
                table: "DC21Ecriture",
                columns: new[] { "NoClient", "NoJournal" });

            migrationBuilder.CreateIndex(
                name: "IX_DC22EcritureCollective_NoClient_NoJournal",
                table: "DC22EcritureCollective",
                columns: new[] { "NoClient", "NoJournal" });

            migrationBuilder.CreateIndex(
                name: "IX_DC30EcritureJournal_NoClient_NoCompteCredit",
                table: "DC30EcritureJournal",
                columns: new[] { "NoClient", "NoCompteCredit" });

            migrationBuilder.CreateIndex(
                name: "IX_DC30EcritureJournal_NoClient_NoCompteDebit",
                table: "DC30EcritureJournal",
                columns: new[] { "NoClient", "NoCompteDebit" });

            migrationBuilder.AddForeignKey(
                name: "FK_DA10Client_DA01Utilisateur_UtilisateurAdminId",
                table: "DA10Client",
                column: "UtilisateurAdminId",
                principalTable: "DA01Utilisateur",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DA01Utilisateur_DA10Client_IdClient",
                table: "DA01Utilisateur");

            migrationBuilder.DropTable(
                name: "DC21Ecriture");

            migrationBuilder.DropTable(
                name: "DC30EcritureJournal");

            migrationBuilder.DropTable(
                name: "DC22EcritureCollective");

            migrationBuilder.DropTable(
                name: "DC10Compte");

            migrationBuilder.DropTable(
                name: "DC31EcritureCollectiveJournal");

            migrationBuilder.DropTable(
                name: "DC20Journal");

            migrationBuilder.DropTable(
                name: "DC01Classe");

            migrationBuilder.DropTable(
                name: "DC02Groupe");

            migrationBuilder.DropTable(
                name: "DC03SousGroupe");

            migrationBuilder.DropTable(
                name: "DA10Client");

            migrationBuilder.DropTable(
                name: "DA01Utilisateur");
        }
    }
}
