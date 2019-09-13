using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Dto.TGC;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Comptabilite
{
    /// <summary>
    /// Journalisation comptable
    /// </summary>
    public class JournalisationRepostiory : IJournalisationRepository
    {
        private readonly DataContext _context;

        public JournalisationRepostiory(DataContext context)
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

        /// <summary>
        /// voilà le code du HashTable qui peut être utile pour la suite
        /// Mise à jour du solde (est calculé avec automapper - donc code obsolète)
        /// HashTag pour le solde
        /// var hashtableSolde = new Hashtable();
        /// double valueTemp = 0;
        /// var compteTemp = 0;
        /// 
        /// compteTemp = item.Montant >= 0 ? item.NoCompteDebit : item.NoCompteCredit;
        /// try
        /// {
        ///     valueTemp = (double)hashtableSolde[compteTemp];
        ///     hashtableSolde.Remove(compteTemp);
        /// } 
        /// catch (NullReferenceException e)
        /// {
        ///     valueTemp = 0;
        /// }
        /// hashtableSolde.Add(compteTemp, item.Montant >= 0 ? item.Montant + valueTemp : (item.Montant * -1) + valueTemp);
        ///
        /// foreach (int key in hashtableSolde.Keys)
        /// {
        ///    var recordDB10 = await _context.DB10Compte.Where(x => x.Id == key).FirstOrDefaultAsync();
        ///    recordDB10.Solde1 += (double) hashtableSolde[key];
        ///    Update<DB10Compte>(recordDB10);
        /// }

        /// <summary>
        /// Vérifie qu'il y ait au moins une écriture collective
        /// </summary>
        /// <param name="noClient">No client</param>
        /// <param name="noUtilisateur">No utilisateur (le journal est multi-client/utilisateur)</param>
        /// <returns></returns>
        public async Task<bool> SwJournalisation(int noClient, int noUtilisateur)
        {
            return await _context.DC31EcritureCollectiveJournal
                .CountAsync(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur)) >= 1 ? true : false;
        }

        /// <summary>
        /// Lancer la journalisation
        /// </summary>
        /// <param name="dto">Dto avec la date de création du journal</param>
        /// <returns></returns>
        public async Task<DC20Journal> Journalisation(DtoTGC002InpDC20JournalForCreate dto, int noClient, int noUtilisateur)
        {
            var recordDC20 = new DC20Journal()
            {
                NoClient = noClient,
                DateJournalisation = dto.DateCompta
            };
            // Increment - manuel pour clé composite
            var lastDC20 = _context.DC20Journal
                .Where(x => x.NoClient == noClient)
                .OrderByDescending(x => x.NoJournal)
                .ToList();
            var nextDC20 = 0;
            foreach (var i in lastDC20)
            {
                nextDC20 = i.NoJournal;
                break;
            }
            nextDC20++;
            recordDC20.NoJournal = nextDC20;
            Add<DC20Journal>(recordDC20);
            if (!await SaveAll())
                return null;

            // Lecture de toutes les écritures collective (même si c'est une écriture simple, elle est indexée dans les écritures collective)
            List<DC31EcritureCollectiveJournal> itemsDC31 = await _context.DC31EcritureCollectiveJournal
                .Where(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur))
                .OrderBy(x => x.NoEcritureCollectiveJournal)
                .ToListAsync();
            // Pour rollback
            var copyItemsDC31 = itemsDC31;
            foreach (var itemDC31 in itemsDC31)
            {
                var recordDC22 = new DC22EcritureCollective()
                {
                    NoClient = noClient,
                    NoJournal = recordDC20.NoJournal,
                    DateEcriture = itemDC31.DateEcriture
                };
                // Increment - manuel pour clé composite
                var lastDC22 = _context.DC22EcritureCollective
                    .Where(x => x.NoClient == noClient)
                    .OrderByDescending(x => x.NoEcritureCollective)
                    .ToList();
                var nextDC22 = 0;
                foreach (var i in lastDC22)
                {
                    nextDC22 = i.NoEcritureCollective;
                    break;
                }
                nextDC22++;
                recordDC22.NoEcritureCollective = nextDC22;
                Add<DC22EcritureCollective>(recordDC22);
                if (!await SaveAll())
                    return await RollBackJournalisation(noClient, noUtilisateur, recordDC20.NoJournal, copyItemsDC31);
                // Lecture de toutes les écritures dans l'écriture collective
                foreach (var item in itemDC31.EcritureJournal)
                {
                    ///
                    /// Dans le cas d'une écriture simple, le compte débit et crédit est toujours
                    /// allimenté
                    /// 
                    /// Mais dans le cas d'une écriture collective on peut avoir
                    /// [Debit] - [Rien  ] -> Donc pas de contre partie, la contre partie est collective
                    /// [Rien ] - [Credit]
                    /// [Rien ] - [Credit]

                    /// Première écriture
                    /// Le if est une sécurité pour être sur que la FK NoCompte est allimenté
                    if (item.Montant >= 0 ? item.NoCompteDebit != null : item.NoCompteCredit != null)
                    {
                        var noCompteEcriture1 = item.Montant >= 0 ? (int) item.NoCompteDebit : (int) item.NoCompteCredit;
                        // Increment - manuel pour clé composite
                        var lastDC21 = _context.DC21Ecriture
                            .Where(x => (x.NoClient == noClient) && (x.NoEcritureCollective == recordDC22.NoEcritureCollective))
                            .OrderByDescending(x => x.NoEcriture)
                            .ToList();
                        var nextDC21 = 0;
                        foreach (var i in lastDC21)
                        {
                            nextDC21 = i.NoEcriture;
                            break;
                        }
                        nextDC21++;
                        var recordDC21 = new DC21Ecriture()
                        {
                            NoClient = noClient,
                            NoEcritureCollective = recordDC22.NoEcritureCollective,
                            NoEcriture = nextDC21,
                            NoCompte = noCompteEcriture1,
                            ContrePartie = item.Montant >= 0 
                                ? item.NoCompteCredit 
                                : item.NoCompteDebit,
                            NoPiece = item.NoPiece,
                            MontantDebit = item.Montant >= 0 
                                ? item.Montant : 0,
                            MontantCredit = item.Montant >= 0 
                                ? 0 
                                : (item.Montant * -1),
                            Libelle1 = item.Libelle1,
                            Libelle2 = item.Libelle2,
                            SwImpressionExtourne = true,
                            NoJournal = recordDC20.NoJournal,
                        };
                        Add<DC21Ecriture>(recordDC21);
                        if (!await SaveAll())
                            return await RollBackJournalisation(noClient, noUtilisateur, recordDC20.NoJournal, copyItemsDC31);
                    }
                    /// Deuxième écriture
                    /// Le if est une sécurité pour être sur que la FK NoCompte est allimenté
                    if (item.Montant >= 0 ? item.NoCompteCredit != null : item.NoCompteDebit != null)
                    {
                        var noCompteEcriture2 = item.Montant >= 0 ? (int) item.NoCompteCredit : (int) item.NoCompteDebit;
                        // Increment - manuel pour clé composite
                        var lastDC21 = _context.DC21Ecriture
                            .Where(x => (x.NoClient == noClient) && (x.NoEcritureCollective == recordDC22.NoEcritureCollective))
                            .OrderByDescending(x => x.NoEcriture)
                            .ToList();
                        var nextDC21 = 0;
                        foreach (var i in lastDC21)
                        {
                            nextDC21 = i.NoEcriture;
                            break;
                        }
                        nextDC21++;
                        var recordDC21 = new DC21Ecriture()
                        {
                            NoClient = noClient,
                            NoEcritureCollective = recordDC22.NoEcritureCollective,
                            NoEcriture = nextDC21,
                            NoCompte = noCompteEcriture2,
                            ContrePartie = item.Montant >= 0 
                                ? item.NoCompteDebit 
                                : item.NoCompteCredit,
                            NoPiece = item.NoPiece,
                            MontantDebit = item.Montant >= 0 
                                ? 0 
                                : (item.Montant * -1),
                            MontantCredit = item.Montant >= 0 
                                ? item.Montant 
                                : 0,
                            Libelle1 = item.Libelle1,
                            Libelle2 = item.Libelle2,
                            SwImpressionExtourne = true,
                            NoJournal = recordDC20.NoJournal,
                        };
                        Add<DC21Ecriture>(recordDC21);
                        if (!await SaveAll())
                            return await RollBackJournalisation(noClient, noUtilisateur, recordDC20.NoJournal, copyItemsDC31);
                    }
                }
                // Suppression des écritures à journaliser
                foreach (var item in itemDC31.EcritureJournal)
                    // Suppression de l'écriture à journaliser
                    Delete<DC30EcritureJournal>(item);
                // Suppression de l'écriture collective à journaliser
                Delete<DC31EcritureCollectiveJournal>(itemDC31);
                // Sauvegarde
                if (!await SaveAll())
                    return await RollBackJournalisation(noClient, noUtilisateur, recordDC20.NoJournal, copyItemsDC31);
            }
            return await _context.DC20Journal
                .Include(x => x.Ecriture)
                .ThenInclude(x => x.Compte)
                .Include(x => x.Ecriture)
                .ThenInclude(x => x.CompteContrePartie)
                .FirstOrDefaultAsync(x => (x.NoClient == noClient) && (x.NoJournal == recordDC20.NoJournal));
        }

        private async Task<DC20Journal> RollBackJournalisation(int noClient, int noUtilisateur, int noJournal, List<DC31EcritureCollectiveJournal> itemsDC31)
        {
            var itemDC20 = await _context.DC20Journal
                .Include(x => x.EcritureCollective)
                .ThenInclude(x => x.Ecriture)
                .FirstOrDefaultAsync(x => (x.NoClient == noClient) && (x.NoJournal == noJournal));
            // On efface la comptabilisation
            foreach (var item in itemDC20.EcritureCollective)
            {
                foreach (var i in item.Ecriture)
                {
                    Delete<DC21Ecriture>(i);
                }
                Delete<DC22EcritureCollective>(item);
            }
            // Puis le journal
            Delete<DC20Journal>(itemDC20);
            // On re-replit les écritures à journaliser + collective
            foreach (var item in itemsDC31)
            {
                var itemsDC30 = item.EcritureJournal;
                item.EcritureJournal = new List<DC30EcritureJournal>();
                item.NoClient = noClient;
                item.NoUtilisateur = noUtilisateur;
                // Increment - manuel pour clé composite
                var lastDC31 = _context.DC31EcritureCollectiveJournal
                    .Where(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur))
                    .OrderByDescending(x => x.NoEcritureCollectiveJournal)
                    .ToList();
                var nextDC31 = 0;
                foreach (var i in lastDC31)
                {
                    nextDC31 = i.NoEcritureCollectiveJournal;
                    break;
                }
                nextDC31++;
                item.NoEcritureCollectiveJournal = nextDC31;
                Add<DC31EcritureCollectiveJournal>(item);
                await SaveAll();
                foreach (var itemDC30 in itemsDC30)
                {
                    // Increment - manuel pour clé composite
                    var lastDC30 = _context.DC30EcritureJournal
                        .Where(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur) && (x.NoEcritureCollectiveJournal == item.NoEcritureCollectiveJournal))
                        .OrderByDescending(x => x.NoEcritureJournal)
                        .ToList();
                    var nextDC30 = 0;
                    foreach (var i in lastDC30)
                    {
                        nextDC30 = i.NoEcritureJournal;
                        break;
                    }
                    nextDC30++;
                    var recordDC30 = new DC30EcritureJournal()
                    {
                        NoClient = noClient,
                        NoUtilisateur = noUtilisateur,
                        NoEcritureCollectiveJournal = item.NoEcritureCollectiveJournal,
                        NoEcritureJournal = nextDC30,
                        NoCompteDebit = itemDC30.NoCompteDebit,
                        NoCompteCredit = itemDC30.NoCompteCredit,
                        NoPiece = itemDC30.NoPiece,
                        Libelle1 = itemDC30.Libelle1,
                        Libelle2 = itemDC30.Libelle2,
                        Montant = itemDC30.Montant,
                        SwAutomatique = itemDC30.SwAutomatique,
                    };
                    Add<DC30EcritureJournal>(recordDC30);
                    await SaveAll();
                }
            }
            return itemDC20;
        }
    }
}
