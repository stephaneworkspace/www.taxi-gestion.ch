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
 * This program is free software; the source ode is released under and Creative 
 * Commons License.
 * 
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
using Microsoft.EntityFrameworkCore;
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
