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
using AutoMapper;
using System.Linq;
using TaxiGestion.Dto.TGA;
using TaxiGestion.Dto.TGC;
using TaxiGestion.Dto.TGZ;
using TaxiGestion.Models;

namespace TaxiGestion.Mappings
{
    /// <summary>
    /// Profil for Automapper
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // TGA001 Authentification
            CreateMap<DA01Utilisateur, DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription>()
                .ForMember(x => x.PrenomNom, opt => opt.Ignore())
                .AfterMap((a, b) => {
                    b.PrenomNom = a.Client.Prenom + " " + a.Client.NomDeFamille;
            });
            
            // TGA002 Config
            CreateMap<DA21Config, DtoTGA002OutDA21ConfigForSelect>();

            // TGC001 Bilan
            // BIlan écran
            CreateMap<DC10Compte, DtoTGC001OutDC10CompteForList>()
                .ForMember(x => x.NomClasse, opt => opt.MapFrom(y => y.Classe.Texte))
                .ForMember(x => x.NomGroupe, opt => opt.MapFrom(y => y.Groupe.Texte))
                .ForMember(x => x.NomSousGroupe, opt => opt.MapFrom(y => y.SousGroupe.Texte))
                .ForMember(x => x.Solde1, opt => opt.Ignore())
                .AfterMap((a, b) =>
                {
                    var items = a.Ecriture.ToList();
                    foreach (var item in items)
                    {
                        b.Solde1 += (item.MontantDebit + (item.MontantCredit * -1));
                    }
                })
                .ForMember(x => x.Solde2, opt => opt.MapFrom(y => y.SoldeAp));
            // Écritures - Bilan
            CreateMap<DC21Ecriture, DtoTGC001OutDC21EcritureForList>()
                .ForMember(x => x.DesiCompte, opt => opt.MapFrom(y => y.Compte.Texte))
                .ForMember(x => x.DesiContrePartie, opt => opt.MapFrom(y => y.CompteContrePartie.Texte))
                .ForMember(x => x.DateEcriture, 
                           opt => opt.MapFrom(y => y.EcritureCollective.DateEcriture))
                .ForMember(x => x.Debit, 
                           opt => opt.MapFrom(y => y.MontantDebit))
                .ForMember(x => x.Credit, 
                           opt => opt.MapFrom(y => y.MontantCredit))
                .ForMember(x => x.Solde, 
                           opt => opt.MapFrom(y => ((y.MontantDebit) + (y.MontantCredit * -1))))
                .ForMember(x => x.DateJournalisation, 
                           opt => opt.MapFrom(y => y.Journal.DateJournalisation))
                .ForMember(x => x.SwEcritureCollective, opt => opt.Ignore())
                .AfterMap((a, b) =>
                {
                    var items = a.EcritureCollective.Ecriture.ToList();
                    b.SwEcritureCollective = items.Count() > 2 ? true : false;
                });
            // Écriture collective
            CreateMap<DC21Ecriture, DtoTGC001OutDC21EcritureForListColl>()
                .ForMember(x => x.NoCompteDebit, opt => opt.Ignore())
                .ForMember(x => x.DesiCompteDebit, opt => opt.Ignore())
                .ForMember(x => x.NoCompteCredit, opt => opt.Ignore())
                .ForMember(x => x.DesiCompteCredit, opt => opt.Ignore())
                .ForMember(x => x.DateEcriture, 
                           opt => opt.MapFrom(y => y.EcritureCollective.DateEcriture))
                .ForMember(x => x.Debit, opt => opt.MapFrom(y => y.MontantDebit))
                .ForMember(x => x.Credit, opt => opt.MapFrom(y => y.MontantCredit))
                .ForMember(x => x.Solde, 
                           opt => opt.MapFrom(y => ((y.MontantDebit) + (y.MontantCredit * -1))))
                .AfterMap((a, b) =>
                {
                    if (a.MontantDebit > 0)
                    {
                        b.NoCompteDebit = a.NoCompte;
                        b.DesiCompteDebit = a.Compte.Texte;
                        b.NoCompteCredit = null;
                        b.DesiCompteCredit = "";
                    }
                    else
                    {
                        b.NoCompteDebit = null;
                        b.DesiCompteDebit = "";
                        b.NoCompteCredit = a.NoCompte;
                        b.DesiCompteCredit = a.Compte.Texte;
                    }
                });
            // TGC0002 Journalisation
            CreateMap<DC20Journal, DtoTGC002OutDC20JournalForRead>()
                .ForMember(x => x.Ecriture, opt => opt.MapFrom(y => y.Ecriture));
            CreateMap<DC21Ecriture, DtoTGC002OutDC21EcrituresForList>()
                .ForMember(x => x.DesiCompte, opt => opt.MapFrom(y => y.Compte.Texte))
                .ForMember(x => x.DesiContrePartie, opt => opt.MapFrom(y => y.CompteContrePartie.Texte))
                .ForMember(x => x.DateEcriture, 
                           opt => opt.MapFrom(y => y.EcritureCollective.DateEcriture))
                .ForMember(x => x.Debit, opt => opt.MapFrom(y => y.MontantDebit))
                .ForMember(x => x.Credit, opt => opt.MapFrom(y => y.MontantCredit))
                .ForMember(x => x.Solde, 
                           opt => opt.MapFrom(y => ((y.MontantDebit) + (y.MontantCredit * -1))));
            // TGC0003 Saisie écritures
            CreateMap<DC30EcritureJournal, DtoTGC003OutDC30EcritureJournalForList>()
                .ForMember(x => x.DesiCompteDebit, opt => opt.MapFrom(y => y.CompteDebit.Texte))
                .ForMember(x => x.DesiCompteCredit, opt => opt.MapFrom(y => y.CompteCredit.Texte))
                .ForMember(x => x.DateEcriture, 
                           opt => opt.MapFrom(y => y.EcritureCollectiveJournal.DateEcriture));
            // TGZ001 Affichage
            // Liste des comptes
            CreateMap<DC10Compte, DtoTGZ001OutDC10CompteForList>()
                .ForMember(x => x.Solde1, opt => opt.Ignore())
                .ForMember(x => x.Solde1Plus2, opt => opt.Ignore())
                .AfterMap((a, b) =>
                {
                    var items = a.Ecriture.ToList();
                    foreach (var item in items)
                    {
                        b.Solde1 += (item.MontantDebit + (item.MontantCredit * -1));
                    }
                    b.Solde1Plus2 += b.Solde1 + b.Solde2;
                });
        }
    }
}

//opt.MapFrom(y => y.DB21EcrituresJournal.Select(z => (z.MontantDebit + (z.MontantCredit * -1)))));
/*
    .ForMember(x => x.SoldeTest, opt => opt.MapFrom(y => y.));

  //.ForMember(vr => vr.Contact, 
  //           opt => opt.MapFrom(v => new ContactResource { 
  //           Name = v.ContactName, 
  //           Email = v.ContactEmail, 
  //           Phone = v.ContactPhone }))
  .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

// API Resource to Domain
CreateMap<VehicleResource, Vehicle>()
  .ForMember(v => v.Id, opt => opt.Ignore())
  .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
  .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
  .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
  .ForMember(v => v.Features, opt => opt.Ignore())
  .AfterMap((vr, v) => {
      // Remove unselected features
      var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
      foreach (var f in removedFeatures)
          v.Features.Remove(f);

      // Add new features
      var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id))
      .Select(id => new VehicleFeature { FeatureId = id });
      foreach (var f in addedFeatures)
          v.Features.Add(f);
  });
*/
