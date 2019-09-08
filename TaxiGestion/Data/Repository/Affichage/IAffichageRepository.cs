using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Affichage
{
    public interface IAffichageRepository
    {
        Task<List<DC10Compte>> AffichageCompte(int noClient);
    }
}
