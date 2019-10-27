using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Config
{
    public interface IConfigRepository
    {
        Task<DA20Config> PeriodeComptaEnCours(int noClient);
    }
}
