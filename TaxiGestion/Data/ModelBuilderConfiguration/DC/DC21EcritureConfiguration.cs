/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License version 2 as published by 
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for 
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC21EcritureConfiguration : IEntityTypeConfiguration<DC21Ecriture>
    {
        public void Configure(EntityTypeBuilder<DC21Ecriture> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoEcritureCollective, x.NoEcriture });
            builder.HasOne(x => x.Compte)
                .WithMany(y => y.Ecriture)
                .HasForeignKey(z => new { z.NoClient, z.NoCompte })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.HasOne(x => x.CompteContrePartie)
                .WithMany()
                .HasForeignKey(z => new { z.NoClient, z.ContrePartie })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);
            builder.HasOne(x => x.Journal)
                .WithMany(y => y.Ecriture)
                .HasForeignKey(z => new { z.NoClient, z.NoJournal })
                .IsRequired();
            builder.HasOne(x => x.EcritureCollective)
                .WithMany(y => y.Ecriture)
                .HasForeignKey(z => new { z.NoClient, z.NoEcritureCollective })
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
