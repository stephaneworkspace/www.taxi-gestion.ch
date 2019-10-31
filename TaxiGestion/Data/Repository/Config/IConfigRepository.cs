using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Dto.TGA;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Config
{
    /// <summary>
    /// Repository for config data of client
    /// 
    /// Note Okt.2019 -> Warning, config to do on user admin
    /// </summary>
    public interface IConfigRepository
    {
        Task<DA21Config> PeriodeComptaEnCours(int noClient);
        Task<DA21Config> WritePeriodeComptaEncours(int noClient, DtoTGA002InpDA21ConfigForWrite dto);
    }
}
