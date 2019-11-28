/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License version 2 as published by 
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for 
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
using Microsoft.EntityFrameworkCore;
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

        public async Task<DA21Config> WritePeriodeComptaEncours(int noClient, 
                                                                DtoTGA002InpDA21ConfigForWrite dto)
        {
            DA21Config item = await _context.DA21Config.FirstOrDefaultAsync(x => 
                    (x.NoClient == noClient)
                );
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
