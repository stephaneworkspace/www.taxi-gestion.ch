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
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Threading.Tasks;
using TaxiGestion.Data;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Dto.TGA;
using TaxiGestion.Models;
using Xunit;
using Xunit.Abstractions;

namespace TaxiGestionUnit
{
    public class DA001Test
    {
        private readonly ITestOutputHelper _output;

        public DA001Test(ITestOutputHelper output)
        {
            _output = output;
        }

        /// <summary>
    /// Création DataContext
    /// </summary>
    /// <returns></returns>
        public DbContextOptionsBuilder<DataContext> DA001TestDbContext()
        {
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString()).ConfigureWarnings(w => {
                w.Ignore(InMemoryEventId.TransactionIgnoredWarning);
            }).EnableSensitiveDataLogging(true);
            return builder;
        }

        [Fact]
        public async Task Inscription()
        {
            var dto = new DtoTGA001InpDA01UtilisateurPourInscription()
            {
                NomUtilisateur = "stephane",
                MotDePasse = "password",
                Email = "s.bressani@bluewin.ch",
                Prenom = "Stéphane",
                NomDeFamille = "Bressani",
                Adresse = "16A ch. des Buclines",
                CodePostal = "1224",
                Lieu = "Chêne-Bougeries"
            };
            var context = new DataContext(this.DA001TestDbContext().Options);
            // Connection au repository
            var repo = new AuthentificationRepository(context);
            context.Database.EnsureCreated();

            var userToCreate = new DA01Utilisateur
            {
                NomUtilisateur = dto.NomUtilisateur,
                EMail = dto.Email
            };
            var clientToCreate = new DA10Client
            {
                Prenom = dto.Prenom,
                NomDeFamille = dto.NomDeFamille,
                Adresse = dto.Adresse,
                CodePostal = dto.CodePostal,
                Lieu = dto.Lieu
            };
            await repo.Inscription(userToCreate, clientToCreate, dto.MotDePasse);
            Assert.True(await repo.UtilisateurExiste(dto.NomUtilisateur));
        }
    }
}
