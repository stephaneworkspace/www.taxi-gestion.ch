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
            return await _context.DC10Compte.Where(x => x.NoClient == noClient).OrderBy(y => y.NoCompte).ToListAsync();
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
