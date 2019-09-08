using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Dto.TGC;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Comptabilite
{
    public interface IJournalisationRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> SwJournalisation(int noClient, int noUtilisateur);
        Task<DC20Journal> Journalisation(DtoTGC002InpDC20JournalForCreate dto, int noClient, int noUtilisateur);
    }
}
