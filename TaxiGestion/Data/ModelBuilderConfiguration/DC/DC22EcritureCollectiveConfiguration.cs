using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC22EcritureCollectiveConfiguration : IEntityTypeConfiguration<DC22EcritureCollective>
    {
        public void Configure(EntityTypeBuilder<DC22EcritureCollective> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoEcritureCollective });
            builder.HasOne(x => x.Journal)
                .WithMany(y => y.EcritureCollective)
                .HasForeignKey(z => new { z.NoClient, z.NoJournal })
                .IsRequired();
        }
    }
}
