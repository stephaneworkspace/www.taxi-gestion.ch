using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Config
{
    public class ConfigRepository : IConfigRepository
    {
        private readonly DataContext _context;

        public ConfigRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<DA20Config> PeriodeComptaEnCours(int noClient)
        {
            return await _context.DA20Config.FirstOrDefaultAsync(x => (x.NoClient == noClient));
        }
    }
}
