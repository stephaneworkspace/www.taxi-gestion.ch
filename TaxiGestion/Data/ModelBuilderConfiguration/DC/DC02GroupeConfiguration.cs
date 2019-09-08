using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC02GroupeConfiguration : IEntityTypeConfiguration<DC02Groupe>
    {
        public void Configure(EntityTypeBuilder<DC02Groupe> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoGroupe });
        }
    }
}
