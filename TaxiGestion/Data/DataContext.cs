/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License version 2 as published by 
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for 
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
using Microsoft.EntityFrameworkCore;
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
            modelBuilder.ApplyConfiguration(
                    new DC22EcritureCollectiveConfiguration());
            modelBuilder.ApplyConfiguration(new DC21EcritureConfiguration());
            modelBuilder.ApplyConfiguration(
                    new DC22EcritureCollectiveConfiguration());
            modelBuilder.ApplyConfiguration(
                    new DC30EcritureJournalConfiguration());
            modelBuilder.ApplyConfiguration(
                    new DC31EcritureCollectiveJournalConfiguration());
        }
    }
}
