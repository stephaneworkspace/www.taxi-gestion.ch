using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Comptabilite
{
    public class GestionEcritureJournalRepository: IGestionEcritureJournalRepository
    {
        private readonly DataContext _context;

        public GestionEcritureJournalRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<DC30EcritureJournal>> ListeEnAttenteDeJournalisation(int noClient, int noUtilisateur)
        {
            return await _context.DC30EcritureJournal
                .Where(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur))
                .OrderBy(x => x.NoEcritureCollectiveJournal)
                .ThenBy(x => x.NoEcritureJournal)
                .ToListAsync();
        }
    }
}