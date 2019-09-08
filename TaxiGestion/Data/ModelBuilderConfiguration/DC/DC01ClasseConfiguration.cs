using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC01ClasseConfiguration : IEntityTypeConfiguration<DC01Classe>
    {
        public void Configure(EntityTypeBuilder<DC01Classe> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoClasse });
        }
    }
}