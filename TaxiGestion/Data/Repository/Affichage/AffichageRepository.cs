using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Affichage
{
    public class AffichageRepository : IAffichageRepository
    {
        private readonly DataContext _context;

        public AffichageRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<DC10Compte>> AffichageCompte(int noClient)
        {
            return await _context.DC10Compte
                .Where(x => x.NoClient == noClient)
                .OrderBy(x => x.NoCompte)
                .ToListAsync();
        }
    }
}
