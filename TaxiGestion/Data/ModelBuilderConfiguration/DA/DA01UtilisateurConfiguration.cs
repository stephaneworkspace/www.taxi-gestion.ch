using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DA
{
    public class DA01UtilisateurConfiguration : IEntityTypeConfiguration<DA01Utilisateur>
    {
        public void Configure(EntityTypeBuilder<DA01Utilisateur> builder)
        {
            builder.HasOne(x => x.Client)
                .WithMany(y => y.UtilisateurClient)
                .HasForeignKey(z => z.IdClient)
                .IsRequired();
        }
    }
}
