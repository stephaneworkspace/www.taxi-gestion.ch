using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC20JournalConfiguration : IEntityTypeConfiguration<DC20Journal>
    {
        public void Configure(EntityTypeBuilder<DC20Journal> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoJournal });
        }
    }
}
