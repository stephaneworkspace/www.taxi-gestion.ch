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
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *****************************************************************************/
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaxiGestion.Models;

namespace TaxiGestion.Data.ModelBuilderConfiguration.DC
{
    internal class DC10CompteConfiguration : IEntityTypeConfiguration<DC10Compte>
    {
        public void Configure(EntityTypeBuilder<DC10Compte> builder)
        {
            builder.HasKey(x => new { x.NoClient, x.NoCompte });
            builder.HasOne(x => x.Classe)
                .WithMany(y => y.Compte)
                .HasForeignKey(z => new { z.NoClient, z.NoClasse })
                .IsRequired();
            builder.HasOne(x => x.Groupe)
                .WithMany(y => y.Compte)
                .HasForeignKey(z => new { z.NoClient, z.NoGroupe })
                .IsRequired();
            builder.HasOne(x => x.SousGroupe)
                .WithMany(y => y.Compte)
                .HasForeignKey(z => new { z.NoClient, z.NoSousGroupe })
                .IsRequired();
        }
    }
}
