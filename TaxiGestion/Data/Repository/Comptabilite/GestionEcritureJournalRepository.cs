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
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *****************************************************************************/
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Dto.TGC;
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

        public async Task<List<DC30EcritureJournal>> ListeEnAttenteDeJournalisation(int noClient, 
                                                                                    int noUtilisateur)
        {
            return await _context.DC30EcritureJournal
                .Where(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur))
                .OrderBy(x => x.NoEcritureCollectiveJournal)
                .ThenBy(x => x.NoEcritureJournal)
                .ToListAsync();
        }

        public async Task<DC31EcritureCollectiveJournal> SaisieEcritureSimple(int noClient, 
                int noUtilisateur, DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple dto)
        {
            var recordDC31 = new DC31EcritureCollectiveJournal()
            {
                NoClient = noClient,
                NoUtilisateur = noUtilisateur
            };
            var lastDC31 = _context.DC31EcritureCollectiveJournal
                .Where(x => x.NoClient == noClient && x.NoUtilisateur == noUtilisateur)
                .OrderByDescending(X => X.NoEcritureCollectiveJournal)
                .ToList();
            var nextDC31 = 0;
            foreach (var i in lastDC31)
            {
                nextDC31 = i.NoEcritureCollectiveJournal;
                break;
            }
            nextDC31++;
            recordDC31 = new DC31EcritureCollectiveJournal()
            {
                NoClient = noClient,
                NoUtilisateur = noUtilisateur,
                NoEcritureCollectiveJournal = nextDC31,
                DateEcriture = dto.DateEcriture
            };
            Add<DC31EcritureCollectiveJournal>(recordDC31);
            //if (!await SaveAll()) // pas besoin de rollback, c'est pas une suite d'écritures
            //    return null;
            var recordDC30 = new DC30EcritureJournal()
            {
                NoClient = noClient,
                NoUtilisateur = noUtilisateur,
                NoEcritureCollectiveJournal = nextDC31,
                NoEcritureJournal = 1,
                NoCompteDebit = dto.NoCompteDebit,
                NoCompteCredit = dto.NoCompteCredit,
                NoPiece = dto.NoPiece,
                // DatePiece A FAIRE ISSUE 31
                Libelle1 = dto.Libelle1Debit,
                Libelle2 = dto.Libelle2Debit,
                // Libellé crédit A FAIRE ISSUE 31
                Montant = dto.Montant,
                SwAutomatique = false,
            };
            Add<DC30EcritureJournal>(recordDC30);
            if (!await SaveAll())
                return null;
            return await _context.DC31EcritureCollectiveJournal
                .FirstOrDefaultAsync(x => 
                        (x.NoClient == noClient) 
                        && (x.NoUtilisateur == noUtilisateur) 
                        && (x.NoEcritureCollectiveJournal == nextDC31)
                    );
        }
    }
}
