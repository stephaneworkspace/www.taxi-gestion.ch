﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TaxiGestion.Data;

namespace TaxiGestion.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20191027191241_AjoutD20Config")]
    partial class AjoutD20Config
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TaxiGestion.Models.DA01Utilisateur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreation")
                        .HasColumnType("datetime2");

                    b.Property<string>("EMail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdClient")
                        .HasColumnType("int");

                    b.Property<string>("MotDePasseEMailConfirmation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("MotDePasseHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("MotDePasseSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("NomUtilisateur")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("SwActive")
                        .HasColumnType("bit");

                    b.Property<bool>("SwActiveClient")
                        .HasColumnType("bit");

                    b.Property<bool>("SwEMailConfirmation")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("IdClient");

                    b.ToTable("DA01Utilisateur");
                });

            modelBuilder.Entity("TaxiGestion.Models.DA10Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adresse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CodePostal")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lieu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NomDeFamille")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UtilisateurAdminId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UtilisateurAdminId");

                    b.ToTable("DA10Client");
                });

            modelBuilder.Entity("TaxiGestion.Models.DA20Config", b =>
                {
                    b.Property<int>("NoClient")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("PeriodeComptaDateDebut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("PeriodeComptaDateFin")
                        .HasColumnType("datetime2");

                    b.HasKey("NoClient");

                    b.ToTable("DA20Config");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC01Classe", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoClasse")
                        .HasColumnType("int");

                    b.Property<string>("Texte")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NoClient", "NoClasse");

                    b.ToTable("DC01Classe");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC02Groupe", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoGroupe")
                        .HasColumnType("int");

                    b.Property<string>("Texte")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NoClient", "NoGroupe");

                    b.ToTable("DC02Groupe");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC03SousGroupe", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoSousGroupe")
                        .HasColumnType("int");

                    b.Property<string>("Texte")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NoClient", "NoSousGroupe");

                    b.ToTable("DC03SousGroupe");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC10Compte", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoCompte")
                        .HasColumnType("int");

                    b.Property<int>("NoClasse")
                        .HasColumnType("int");

                    b.Property<int>("NoGroupe")
                        .HasColumnType("int");

                    b.Property<int>("NoSousGroupe")
                        .HasColumnType("int");

                    b.Property<double>("SoldeAp")
                        .HasColumnType("float");

                    b.Property<string>("Texte")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NoClient", "NoCompte");

                    b.HasIndex("NoClient", "NoClasse");

                    b.HasIndex("NoClient", "NoGroupe");

                    b.HasIndex("NoClient", "NoSousGroupe");

                    b.ToTable("DC10Compte");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC20Journal", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoJournal")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateJournalisation")
                        .HasColumnType("datetime2");

                    b.HasKey("NoClient", "NoJournal");

                    b.ToTable("DC20Journal");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC21Ecriture", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoEcritureCollective")
                        .HasColumnType("int");

                    b.Property<int>("NoEcriture")
                        .HasColumnType("int");

                    b.Property<int?>("ContrePartie")
                        .HasColumnType("int");

                    b.Property<string>("Libelle1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Libelle2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("MontantCredit")
                        .HasColumnType("float");

                    b.Property<double>("MontantDebit")
                        .HasColumnType("float");

                    b.Property<int>("NoCompte")
                        .HasColumnType("int");

                    b.Property<int>("NoJournal")
                        .HasColumnType("int");

                    b.Property<int>("NoPiece")
                        .HasColumnType("int");

                    b.Property<bool>("SwImpressionExtourne")
                        .HasColumnType("bit");

                    b.HasKey("NoClient", "NoEcritureCollective", "NoEcriture");

                    b.HasIndex("NoClient", "ContrePartie");

                    b.HasIndex("NoClient", "NoCompte");

                    b.HasIndex("NoClient", "NoJournal");

                    b.ToTable("DC21Ecriture");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC22EcritureCollective", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoEcritureCollective")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateEcriture")
                        .HasColumnType("datetime2");

                    b.Property<int>("NoJournal")
                        .HasColumnType("int");

                    b.HasKey("NoClient", "NoEcritureCollective");

                    b.HasIndex("NoClient", "NoJournal");

                    b.ToTable("DC22EcritureCollective");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC30EcritureJournal", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoUtilisateur")
                        .HasColumnType("int");

                    b.Property<int>("NoEcritureCollectiveJournal")
                        .HasColumnType("int");

                    b.Property<int>("NoEcritureJournal")
                        .HasColumnType("int");

                    b.Property<string>("Libelle1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Libelle2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Montant")
                        .HasColumnType("float");

                    b.Property<int?>("NoCompteCredit")
                        .HasColumnType("int");

                    b.Property<int?>("NoCompteDebit")
                        .HasColumnType("int");

                    b.Property<int>("NoPiece")
                        .HasColumnType("int");

                    b.Property<bool>("SwAutomatique")
                        .HasColumnType("bit");

                    b.HasKey("NoClient", "NoUtilisateur", "NoEcritureCollectiveJournal", "NoEcritureJournal");

                    b.HasIndex("NoClient", "NoCompteCredit");

                    b.HasIndex("NoClient", "NoCompteDebit");

                    b.ToTable("DC30EcritureJournal");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC31EcritureCollectiveJournal", b =>
                {
                    b.Property<int>("NoClient")
                        .HasColumnType("int");

                    b.Property<int>("NoUtilisateur")
                        .HasColumnType("int");

                    b.Property<int>("NoEcritureCollectiveJournal")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateEcriture")
                        .HasColumnType("datetime2");

                    b.HasKey("NoClient", "NoUtilisateur", "NoEcritureCollectiveJournal");

                    b.ToTable("DC31EcritureCollectiveJournal");
                });

            modelBuilder.Entity("TaxiGestion.Models.DA01Utilisateur", b =>
                {
                    b.HasOne("TaxiGestion.Models.DA10Client", "Client")
                        .WithMany("UtilisateurClient")
                        .HasForeignKey("IdClient")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaxiGestion.Models.DA10Client", b =>
                {
                    b.HasOne("TaxiGestion.Models.DA01Utilisateur", "UtilisateurAdmin")
                        .WithMany()
                        .HasForeignKey("UtilisateurAdminId");
                });

            modelBuilder.Entity("TaxiGestion.Models.DC10Compte", b =>
                {
                    b.HasOne("TaxiGestion.Models.DC01Classe", "Classe")
                        .WithMany("Compte")
                        .HasForeignKey("NoClient", "NoClasse")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TaxiGestion.Models.DC02Groupe", "Groupe")
                        .WithMany("Compte")
                        .HasForeignKey("NoClient", "NoGroupe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TaxiGestion.Models.DC03SousGroupe", "SousGroupe")
                        .WithMany("Compte")
                        .HasForeignKey("NoClient", "NoSousGroupe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaxiGestion.Models.DC21Ecriture", b =>
                {
                    b.HasOne("TaxiGestion.Models.DC10Compte", "CompteContrePartie")
                        .WithMany()
                        .HasForeignKey("NoClient", "ContrePartie")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TaxiGestion.Models.DC10Compte", "Compte")
                        .WithMany("Ecriture")
                        .HasForeignKey("NoClient", "NoCompte")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("TaxiGestion.Models.DC22EcritureCollective", "EcritureCollective")
                        .WithMany("Ecriture")
                        .HasForeignKey("NoClient", "NoEcritureCollective")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("TaxiGestion.Models.DC20Journal", "Journal")
                        .WithMany("Ecriture")
                        .HasForeignKey("NoClient", "NoJournal")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaxiGestion.Models.DC22EcritureCollective", b =>
                {
                    b.HasOne("TaxiGestion.Models.DC20Journal", "Journal")
                        .WithMany("EcritureCollective")
                        .HasForeignKey("NoClient", "NoJournal")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaxiGestion.Models.DC30EcritureJournal", b =>
                {
                    b.HasOne("TaxiGestion.Models.DC10Compte", "CompteCredit")
                        .WithMany()
                        .HasForeignKey("NoClient", "NoCompteCredit")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TaxiGestion.Models.DC10Compte", "CompteDebit")
                        .WithMany()
                        .HasForeignKey("NoClient", "NoCompteDebit")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TaxiGestion.Models.DC31EcritureCollectiveJournal", "EcritureCollectiveJournal")
                        .WithMany("EcritureJournal")
                        .HasForeignKey("NoClient", "NoUtilisateur", "NoEcritureCollectiveJournal")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
