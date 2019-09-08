using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC21EcritureConfiguration : IEntityTypeConfiguration<DC21Ecriture>
    {
        public void Configure(EntityTypeBuilder<DC21Ecriture> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoEcritureCollective, x.NoEcriture });
            builder.HasOne(x => x.Compte)
                .WithMany(y => y.Ecriture)
                .HasForeignKey(z => new { z.NoClient, z.NoCompte })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.HasOne(x => x.CompteContrePartie)
                .WithMany()
                .HasForeignKey(z => new { z.NoClient, z.ContrePartie })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);
            builder.HasOne(x => x.Journal)
                .WithMany(y => y.Ecriture)
                .HasForeignKey(z => new { z.NoClient, z.NoJournal })
                .IsRequired();
            builder.HasOne(x => x.EcritureCollective)
                .WithMany(y => y.Ecriture)
                .HasForeignKey(z => new { z.NoClient, z.NoEcritureCollective })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
