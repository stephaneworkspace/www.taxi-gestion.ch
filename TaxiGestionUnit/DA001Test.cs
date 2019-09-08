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
            using var context = new DataContext(this.DA001TestDbContext().Options);
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
