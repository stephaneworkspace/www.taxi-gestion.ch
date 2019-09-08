using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC10CompteConfiguration : IEntityTypeConfiguration<DC10Compte>
    {
        public void Configure(EntityTypeBuilder<DC10Compte> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoCompte });
            builder.HasOne(x => x.Classe)
                .WithMany(y => y.Compte)
                .HasForeignKey(z => new { z.NoClient, z.NoClasse })
                .IsRequired();
            builder.HasOne(x => x.Groupe)
                .WithMany(y => y.Compte)
                .HasForeignKey(z => new { z.NoClient, z.NoGroupe })
                .IsRequired();
            builder.HasOne(x => x.SousGroupe)
                .WithMany(y => y.Compte)
                .HasForeignKey(z => new { z.NoClient, z.NoSousGroupe })
                .IsRequired();
        }
    }
}
