using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DA
{
    internal class DA21ConfigConfiguration : IEntityTypeConfiguration<DA21Config>
    {
        public void Configure(EntityTypeBuilder<DA21Config> builder)
        {
            builder.HasKey(x => new { x.NoClient });
            builder.Property(x => x.NoClient).ValueGeneratedNever();
        }
    }
}