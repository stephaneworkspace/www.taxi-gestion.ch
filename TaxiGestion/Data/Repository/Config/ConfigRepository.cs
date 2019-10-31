using Microsoft.EntityFrameworkCore;
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
    public class ConfigRepository : IConfigRepository
    {
        private readonly DataContext _context;

        public ConfigRepository(DataContext context)
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

        public async Task<DA21Config> PeriodeComptaEnCours(int noClient)
        {
            return await _context.DA21Config.FirstOrDefaultAsync(x => (x.NoClient == noClient));
        }

        public async Task<DA21Config> WritePeriodeComptaEncours(int noClient, DtoTGA002InpDA21ConfigForWrite dto)
        {
            DA21Config item = await _context.DA21Config.FirstOrDefaultAsync(x => (x.NoClient == noClient));
            var recordDA21 = new DA21Config()
            {
                NoClient = noClient,
                PeriodeComptaDateDebut = dto.PeriodeComptaDateDebut,
                PeriodeComptaDateFin = dto.PeriodeComptaDateFin
            };
            if (item == null)
                Add<DA21Config>(recordDA21);
            else
            {
                item.PeriodeComptaDateDebut = recordDA21.PeriodeComptaDateDebut;
                item.PeriodeComptaDateFin = recordDA21.PeriodeComptaDateFin;
                Update<DA21Config>(item);
            }
            if (!await SaveAll())
                return null;
            else
                return recordDA21;
        }
    }
}
