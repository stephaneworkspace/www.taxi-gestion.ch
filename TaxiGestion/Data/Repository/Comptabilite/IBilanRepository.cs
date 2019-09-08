using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Comptabilite
{
    public interface IBilanRepository
    {
        Task<List<DC10Compte>> BilanEcran(int noClient);
        Task<List<DC21Ecriture>> EcrituresCompte(int noCompte, int noClient);
        Task<List<DC21Ecriture>> EcritureCollective(int noEcritureCollective, int noClient);
    }
}
