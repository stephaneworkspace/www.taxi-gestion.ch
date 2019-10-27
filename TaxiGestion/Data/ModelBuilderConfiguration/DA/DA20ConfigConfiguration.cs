using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DA
{
    internal class DA20ConfigConfiguration : IEntityTypeConfiguration<DA20Config>
    {
        public void Configure(EntityTypeBuilder<DA20Config> builder)
        {
            builder.HasKey(x => new { x.NoClient });
        }
    }
}