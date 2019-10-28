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

        public async Task<DA20Config> PeriodeComptaEnCours(int noClient)
        {
            return await _context.DA20Config.FirstOrDefaultAsync(x => (x.NoClient == noClient));
        }

        public async Task<DA20Config> WritePeriodeComptaEncours(int noClient, DtoTGA002InpDA20ConfigForWrite dto)
        {
            DA20Config item = await _context.DA20Config.FirstOrDefaultAsync(x => (x.NoClient == noClient));
            var recordDA20 = new DA20Config()
            {
                NoClient = noClient,
                PeriodeComptaDateDebut = dto.PeriodeComptaDateDebut,
                PeriodeComptaDateFin = dto.PeriodeComptaDateFin
            };
            if (item == null)
                Add<DA20Config>(recordDA20);
            else
                Update<DA20Config>(recordDA20);
            if (!await SaveAll())
                return null;
            else
                return recordDA20;
        }
    }
}
