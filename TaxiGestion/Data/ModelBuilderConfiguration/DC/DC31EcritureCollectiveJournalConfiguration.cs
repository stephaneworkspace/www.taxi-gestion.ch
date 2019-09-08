using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC31EcritureCollectiveJournalConfiguration : IEntityTypeConfiguration<DC31EcritureCollectiveJournal>
    {
        public void Configure(EntityTypeBuilder<DC31EcritureCollectiveJournal> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoUtilisateur, x.NoEcritureCollectiveJournal });
        }
    }
}
