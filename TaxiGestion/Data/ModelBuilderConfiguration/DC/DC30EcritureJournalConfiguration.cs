using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC30EcritureJournalConfiguration : IEntityTypeConfiguration<DC30EcritureJournal>
    {
        public void Configure(EntityTypeBuilder<DC30EcritureJournal> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoUtilisateur, x.NoEcritureCollectiveJournal, x.NoEcritureJournal });
            builder.HasOne(x => x.EcritureCollectiveJournal)
                .WithMany(y => y.EcritureJournal)
                .HasForeignKey(z => new { z.NoClient, z.NoUtilisateur, z.NoEcritureCollectiveJournal})
                .IsRequired();
            builder.HasOne(x => x.CompteDebit)
                .WithMany()
                .HasForeignKey(z => new { z.NoClient, z.NoCompteDebit })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);
            builder.HasOne(x => x.CompteCredit)
                .WithMany()
                .HasForeignKey(z => new { z.NoClient, z.NoCompteCredit })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);
        }
    }
}
