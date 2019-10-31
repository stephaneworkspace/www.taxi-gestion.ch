using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Data.ModelBuilderConfiguration.DA;
using TaxiGestion.Data.ModelBuilderConfiguration.DC;
using TaxiGestion.Models;

namespace TaxiGestion.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

        /* Authentification */
        public DbSet<DA01Utilisateur> DA01Utilisateur { get; set; }
        public DbSet<DA10Client> DA10Client { get; set; }

        /* Config */
        public DbSet<DA21Config> DA21Config { get; set; }

        /* Comptabilité */
        public DbSet<DC01Classe> DC01Classe { get; set; }
        public DbSet<DC02Groupe> DC02Groupe { get; set; }
        public DbSet<DC03SousGroupe> DC03SousGroupe { get; set; }
        public DbSet<DC10Compte> DC10Compte { get; set; }
        public DbSet<DC20Journal> DC20Journal { get; set; }
        public DbSet<DC21Ecriture> DC21Ecriture { get; set; }
        public DbSet<DC22EcritureCollective> DC22EcritureCollective { get; set; }
        public DbSet<DC30EcritureJournal> DC30EcritureJournal { get; set; }
        public DbSet<DC31EcritureCollectiveJournal> DC31EcritureCollectiveJournal { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /* Authentification */
            modelBuilder.ApplyConfiguration(new DA01UtilisateurConfiguration());


            /* Config */
            modelBuilder.ApplyConfiguration(new DA21ConfigConfiguration());

            /* Comptabilité */
            modelBuilder.ApplyConfiguration(new DC01ClasseConfiguration());
            modelBuilder.ApplyConfiguration(new DC02GroupeConfiguration());
            modelBuilder.ApplyConfiguration(new DC03SousGroupeConfiguration());
            modelBuilder.ApplyConfiguration(new DC10CompteConfiguration());
            modelBuilder.ApplyConfiguration(new DC20JournalConfiguration());
            modelBuilder.ApplyConfiguration(new DC21EcritureConfiguration());
            modelBuilder.ApplyConfiguration(new DC22EcritureCollectiveConfiguration());
            modelBuilder.ApplyConfiguration(new DC21EcritureConfiguration());
            modelBuilder.ApplyConfiguration(new DC22EcritureCollectiveConfiguration());
            modelBuilder.ApplyConfiguration(new DC30EcritureJournalConfiguration());
            modelBuilder.ApplyConfiguration(new DC31EcritureCollectiveJournalConfiguration());
        }
    }
}
