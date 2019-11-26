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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Comptabilite
{
    public class BilanRepository : IBilanRepository
    {
        private readonly DataContext _context;

        public BilanRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<DC10Compte>> BilanEcran(int noClient)
        {
            return await _context.DC10Compte.Where(x => x.NoClient == noClient)
                .OrderBy(y => y.NoCompte).ToListAsync();
        }

        public async Task<List<DC21Ecriture>> EcrituresCompte(int noCompte, int noClient)
        {
            return await _context.DC21Ecriture
                .Where(x => (x.NoClient == noClient) && (x.NoCompte == noCompte))
                .OrderBy(x => x.EcritureCollective.DateEcriture)
                .Include(x => x.EcritureCollective)
                .ThenInclude(x => x.Ecriture)
                .ToListAsync();
        }

        public async Task<List<DC21Ecriture>> EcritureCollective(int noEcritureCollective, int noClient)
        {
            return await _context.DC21Ecriture
                .Where(x => (x.NoClient == noClient) && (x.NoEcritureCollective == noEcritureCollective))
                .ToListAsync();
        }
    }
}
