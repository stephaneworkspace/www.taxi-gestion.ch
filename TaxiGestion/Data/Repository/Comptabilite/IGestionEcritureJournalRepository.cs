using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Dto;
using TaxiGestion.Dto.TGC;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Comptabilite
{
    /// <summary>
    /// Gestion d'écriture avant journalisation
    /// </summary>
    public interface IGestionEcritureJournalRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<DC30EcritureJournal>> ListeEnAttenteDeJournalisation(int noClient, int noUtilisateur);
        Task<DC31EcritureCollectiveJournal> SaisieEcritureSimple(int noClient, int noUtilisateur, DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple dto);
    }
}
