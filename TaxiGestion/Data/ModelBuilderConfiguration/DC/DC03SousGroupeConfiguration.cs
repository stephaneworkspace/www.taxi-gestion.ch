using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC03SousGroupeConfiguration : IEntityTypeConfiguration<DC03SousGroupe>
    {
        public void Configure(EntityTypeBuilder<DC03SousGroupe> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoSousGroupe });
        }
    }
}
