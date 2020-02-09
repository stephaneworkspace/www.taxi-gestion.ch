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
 * This program is free software; the source ode is released under and Creative
 * Commons License.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SortDescriptor} from '@progress/kendo-data-query';
import * as moment from 'moment';
import numeral from 'numeral';
import {Observable} from 'rxjs';
import {
  DtoTGC001OutDC10CompteForList as DtoDC10
} from 'src/app/_dto/TGC/DtoTGC001OutDC10CompteForList';
import {
  DtoTGC001OutDC21EcritureForList as DtoDC21
} from 'src/app/_dto/TGC/DtoTGC001OutDC21EcritureForList';
import {
  DtoTGC001OutDC21EcritureForListColl as DtoDC21Coll
} from 'src/app/_dto/TGC/DtoTGC001OutDC21EcritureForListColl';
import {environment} from '../../environments/environment';

try {
  numeral.register('locale', 'fr-ch', {
    delimiters : {thousands : '\'', decimal : ','},
    abbreviations :
        {thousand : 'k', million : 'm', billion : 'b', trillion : 't'},
    ordinal(nr) { return nr === 1 ? 'er' : 'ème'; },
    currency : {symbol : 'CHF'}
  });
  // switch between locales
  numeral.locale('fr-ch'); // http://numeraljs.com/#custom-formats fr-ch
} catch (e) {
}

// moment
moment.locale('fr-ch');

export interface Bilan {
  debit: number;
  credit: number;
  solde: number;
  debitString: string;
  creditString: string;
  soldeString: string;
}

export interface Classe {
  noClasse: number;
  texte: string;
  groupes: Groupe[];
  debit: number;
  credit: number;
  solde: number;
  debitString: string;
  creditString: string;
  soldeString: string;
}

export interface Groupe {
  noGroupe: number;
  texte: string;
  sousGroupes: SousGroupe[];
  debit: number;
  credit: number;
  solde: number;
  debitString: string;
  creditString: string;
  soldeString: string;
}

export interface SousGroupe {
  noSousGroupe: number;
  texte: string;
  comptes: Compte[];
  debit: number;
  credit: number;
  solde: number;
  debitString: string;
  creditString: string;
  soldeString: string;
}

export interface Compte {
  noCompte: number;
  texte: string;
  debit: number;
  credit: number;
  solde: number;
  debitString: string;
  creditString: string;
  soldeString: string;
}

export interface Ecriture {
  noEcritureCollective: number;
  noEcriture: number;
  noCompte: number;
  desiCompte: string;
  contrePartie: number;
  desiContrePartie: string;
  dateEcriture: Date;
  dateEcritureMoment: string;
  noPiece: number;
  debit: number;
  credit: number;
  solde: number;
  libelle: string;
  swImpressionExtourne: boolean;
  noJournal: number;
  dateJournalisation: Date;
  dateJournalisationMoment: string;
  debitString: string;
  creditString: string;
  soldeString: string;
  swEcritureCollective: boolean;
}

export interface EcritureCollective {
  noEcriture: number;
  noCompteDebit?: number;
  desiCompteDebit: string;
  noCompteCredit?: number;
  desiCompteCredit: string;
  dateEcriture: Date;
  dateEcritureMoment: string;
  noPiece: number;
  debit: number;
  credit: number;
  solde: number;
  libelle: string;
  swImpressionExtourne: boolean;
  debitString: string;
  creditString: string;
  soldeString: string;
  swEcritureCollective: boolean;
}

export interface EcritureCollectiveMontant {
  debit: number;
  credit: number;
  solde: number;
  debitString: string;
  creditString: string;
  soldeString: string;
}

@Injectable({providedIn : 'root'})
export class TGC001BilanService {
  private baseUrl = environment.apiUrl;
  private httpOptions = {};

  public constructor(private http: HttpClient) {}

  private setHeaders() {
    this.httpOptions = {
      headers : new HttpHeaders(
          {Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
  }

  public getPlanComptable(): Observable<DtoDC10[]> {
    this.setHeaders();
    return this.http.get<DtoDC10[]>(this.baseUrl + 'TGC001Bilan/bilan-ecran',
                                    this.httpOptions);
  }

  public getEcritures(noCompte: number): Observable<DtoDC21[]> {
    this.setHeaders();
    return this.http.get<DtoDC21[]>(
        this.baseUrl + 'TGC001Bilan/ecritures-compte/' + noCompte,
        this.httpOptions);
  }

  public getEcrituresCollective(noEcritureCollective: number):
      Observable<DtoDC21Coll[]> {
    this.setHeaders();
    return this.http.get<DtoDC21Coll[]>(this.baseUrl +
                                            'TGC001Bilan/ecriture-collective/' +
                                            noEcritureCollective,
                                        this.httpOptions);
  }

  /**
   * Compute Bilan / Exploitation
   * @param classes Tableau de classes comptable
   */
  public computeTotalBilan(classes: Classe[]): Bilan {
    interface Total {
      debit: number;
      credit: number;
      solde: number;
      debitString: string;
      creditString: string;
      soldeString: string;
    }
    const total: Total = {
      debit : 0,
      credit : 0,
      solde : 0,
      debitString : numeral(0).format('0,0.00 $'),
      creditString : numeral(0).format('0,0.00 $'),
      soldeString : numeral(0).format('0,0.00 $'),
    } as Bilan;
    classes.forEach(classe => {
      total.debit += classe.debit;
      total.credit += classe.credit;
      total.solde += classe.solde;
      total.debitString = numeral(total.debit).format('0,0.00 $');
      total.creditString = numeral(total.credit).format('0,0.00 $');
      total.soldeString = numeral(total.solde).format('0,0.00 $');
    });
    return total;
  }

  /**
   * Compute Array SubGroup of "PlanComptable"
   * @param dto Liste des comptes
   */
  public computeClasse(dto: DtoDC10[]): Classe[] {
    let classesFinal: Classe[];
    classesFinal = new Array();
    let classes: Classe[];
    classes = new Array();
    // Compte Classes without Groupe/SousGroupe/Compte
    dto.forEach(item => {
      if (classes == null || !classes.find(x => x.noClasse === item.noClasse)) {
        const newClasse = {
          noClasse : item.noClasse,
          texte : item.nomClasse,
          groupes : [],
          debit : 0,
          credit : 0,
          solde : 0,
          debitString : '',
          creditString : '',
          soldeString : ''
        } as Classe;
        classes.push(newClasse);
      }
    });
    classes.forEach(classe => {
      let groupes: Groupe[];
      groupes = new Array();
      dto.forEach(item => {
        if (classe.noClasse === item.noClasse) {
          if (!groupes.find(x => x.noGroupe === item.noGroupe)) {
            const newGroupe = {
              noGroupe : item.noGroupe,
              texte : item.nomGroupe,
              sousGroupes : [],
              debit : 0,
              credit : 0,
              solde : 0,
              debitString : '',
              creditString : '',
              soldeString : ''
            } as Groupe;
            groupes.push(newGroupe);
          }
        }
      });
      const newClasse = {
        noClasse : classe.noClasse,
        texte : classe.texte,
        groupes : groupes.slice(),
        debit : classe.debit,
        credit : classe.credit,
        solde : classe.solde,
        debitString : classe.debitString,
        creditString : classe.creditString,
        soldeString : classe.soldeString
      } as Classe;
      classesFinal.push(newClasse);
    });
    // Il manque sous-groupe
    classes = new Array();
    classes = classesFinal.slice();
    classesFinal = new Array(); // reset
    classes.forEach(classe => {
      let groupes: Groupe[];
      groupes = new Array();
      classe.groupes.forEach(groupe => {
        let sousGroupes: SousGroupe[];
        sousGroupes = new Array();
        dto.forEach(item => {
          if (classe.noClasse === item.noClasse &&
              groupe.noGroupe === item.noGroupe) {
            if (!sousGroupes.find(x => x.noSousGroupe === item.noSousGroupe)) {
              const newSousGroupe = {
                noSousGroupe : item.noSousGroupe,
                texte : item.nomSousGroupe,
                comptes : [],
                debit : 0,
                credit : 0,
                solde : 0,
                debitString : '',
                creditString : '',
                soldeString : ''
              } as SousGroupe;
              sousGroupes.push(newSousGroupe);
            }
          }
        });
        const newGroupe = {
          noGroupe : groupe.noGroupe,
          texte : groupe.texte,
          sousGroupes : sousGroupes.slice(),
          debit : groupe.debit,
          credit : groupe.credit,
          solde : groupe.solde,
          debitString : groupe.debitString,
          creditString : groupe.creditString,
          soldeString : groupe.soldeString
        } as Groupe;
        groupes.push(newGroupe);
      });
      const newClasse = {
        noClasse : classe.noClasse,
        texte : classe.texte,
        groupes : groupes.slice(),
        debit : classe.debit,
        credit : classe.credit,
        solde : classe.solde,
        debitString : classe.debitString,
        creditString : classe.creditString,
        soldeString : classe.soldeString
      } as Classe;
      classesFinal.push(newClasse);
    });
    // Il manque les comptes desormais
    classes = new Array();
    classes = classesFinal.slice();
    classesFinal = new Array(); // reset
    classes.forEach(classe => {
      let groupes: Groupe[];
      groupes = new Array();
      classe.groupes.forEach(groupe => {
        let sousGroupes: SousGroupe[];
        sousGroupes = new Array();
        groupe.sousGroupes.forEach(sousGroupe => {
          let comptes: Compte[];
          comptes = new Array();
          dto.forEach(item => {
            if (classe.noClasse === item.noClasse &&
                groupe.noGroupe === item.noGroupe &&
                sousGroupe.noSousGroupe === item.noSousGroupe) {
              if (!comptes.find(x => x.noCompte === item.noCompte)) {
                const newCompte = {
                  noCompte : item.noCompte,
                  texte : item.texte,
                  debit : item.solde1 >= 0 ? item.solde1 : 0,
                  credit : item.solde1 >= 0 ? 0 : (item.solde1 * -1),
                  solde : item.solde1,
                  debitString :
                      numeral(item.solde1 >= 0 ? item.solde1 : 0)
                          .format(
                              '0,0.00 $'), // '0,0[.]00 $' pour presenter bien
                  creditString :
                      numeral(item.solde1 >= 0 ? 0 : (item.solde1 * -1))
                          .format('0,0.00 $'),
                  soldeString : numeral(item.solde1).format('0,0.00 $'),
                } as Compte;
                comptes.push(newCompte);
              }
            }
          });
          // foreach monétaire ici
          let debitComptesTotal: number;
          debitComptesTotal = 0.0;
          let creditComptesTotal: number;
          creditComptesTotal = 0.0;
          let soldeComptesTotal: number;
          soldeComptesTotal = 0.0;
          comptes.forEach(compte => {
            debitComptesTotal += compte.debit;
            creditComptesTotal += compte.credit;
            soldeComptesTotal += compte.solde;
          });
          const newSousGroupe = {
            noSousGroupe : sousGroupe.noSousGroupe,
            texte : sousGroupe.texte,
            comptes : comptes.slice(),
            debit : debitComptesTotal,
            credit : creditComptesTotal,
            solde : soldeComptesTotal,
            debitString : numeral(debitComptesTotal).format('0,0.00 $'),
            creditString : numeral(creditComptesTotal).format('0,0.00 $'),
            soldeString : numeral(soldeComptesTotal).format('0,0.00 $')
          } as SousGroupe;
          sousGroupes.push(newSousGroupe);
        });
        // foreach monétaire ici
        let debitSousGroupesTotal: number;
        debitSousGroupesTotal = 0.0;
        let creditSousGroupesTotal: number;
        creditSousGroupesTotal = 0.0;
        let soldeSousGroupesTotal: number;
        soldeSousGroupesTotal = 0.0;
        sousGroupes.forEach(sousGroupe => {
          debitSousGroupesTotal += sousGroupe.debit;
          creditSousGroupesTotal += sousGroupe.credit;
          soldeSousGroupesTotal += sousGroupe.solde;
        });
        const newGroupe = {
          noGroupe : groupe.noGroupe,
          texte : groupe.texte,
          sousGroupes : sousGroupes.slice(),
          debit : debitSousGroupesTotal,
          credit : creditSousGroupesTotal,
          solde : soldeSousGroupesTotal,
          debitString :
              numeral(debitSousGroupesTotal).format('0,0.00 $'), // ici changer
          creditString :
              numeral(creditSousGroupesTotal).format('0,0.00 $'), // ici changer
          soldeString :
              numeral(soldeSousGroupesTotal).format('0,0.00 $') // ici changer
        } as Groupe;
        groupes.push(newGroupe);
      });
      // foreach monétaire ici
      let debitGroupesTotal: number;
      debitGroupesTotal = 0.0;
      let creditGroupesTotal: number;
      creditGroupesTotal = 0.0;
      let soldeGroupesTotal: number;
      soldeGroupesTotal = 0.0;
      groupes.forEach(groupe => {
        debitGroupesTotal += groupe.debit;
        creditGroupesTotal += groupe.credit;
        soldeGroupesTotal += groupe.solde;
      });
      const newClasse = {
        noClasse : classe.noClasse,
        texte : classe.texte,
        groupes : groupes.slice(),
        debit : debitGroupesTotal,
        credit : creditGroupesTotal,
        solde : soldeGroupesTotal,
        debitString :
            numeral(debitGroupesTotal).format('0,0.00 $'), // ici changer
        creditString :
            numeral(creditGroupesTotal).format('0,0.00 $'), // ici changer
        soldeString :
            numeral(soldeGroupesTotal).format('0,0.00 $') // ici changer
      } as Classe;
      classesFinal.push(newClasse);
    });
    // Set currency from dto
    // numeral(CURRENCY HERE).format('0,0[.]00 $')
    return classesFinal;
  }

  /**
   * Compute Array Ecriture
   * @param dto Liste des écritures comptabilisées
   */
  public computeEcriture(dto: DtoDC21[]): Ecriture[] {
    let ecrituresFinal: Ecriture[];
    ecrituresFinal = new Array();
    dto.forEach(item => {
      const newEcriture = {
        noEcritureCollective : item.noEcritureCollective,
        noEcriture : item.noEcriture,
        noCompte : item.noCompte,
        desiCompte : item.desiCompte,
        contrePartie : item.contrePartie,
        desiContrePartie : item.desiContrePartie,
        dateEcriture : item.dateEcriture,
        dateEcritureMoment : moment(item.dateEcriture).format('L'),
        noPiece : item.noPiece,
        debit : item.debit,
        credit : item.credit,
        solde : item.solde,
        libelle : item.libelle2 === ''
                      ? item.libelle1
                      : item.libelle1 + '<br />' + item.libelle2,
        swImpressionExtourne : item.swImpressionExtourne,
        noJournal : item.noJournal,
        dateJournalisation : item.dateJournalisation,
        dateJournalisationMoment : moment(item.dateJournalisation).format('L'),
        debitString : numeral(item.debit).format('0,0.00 $'),
        creditString : numeral(item.credit).format('0,0.00 $'),
        soldeString : numeral(item.solde).format('0,0.00 $'),
        swEcritureCollective : item.swEcritureCollective
      } as Ecriture;
      ecrituresFinal.push(newEcriture);
    });
    return ecrituresFinal;
  }

  /**
   * Compute Array Ecriture Collective
   * @param dto DtoDB21EcrituresJournalOutputForList
   */
  public computeEcritureCollective(dto: DtoDC21Coll[]): EcritureCollective[] {
    let ecrituresFinal: EcritureCollective[];
    ecrituresFinal = new Array();
    dto.forEach(item => {
      const newEcriture = {
        noEcriture : item.noEcriture,
        noCompteDebit : item.noCompteDebit,
        desiCompteDebit : item.desiCompteDebit,
        noCompteCredit : item.noCompteCredit,
        desiCompteCredit : item.desiCompteCredit,
        dateEcriture : item.dateEcriture,
        dateEcritureMoment : moment(item.dateEcriture).format('L'),
        noPiece : item.noPiece,
        debit : item.debit,
        credit : item.credit,
        solde : item.solde,
        libelle : item.libelle2 === ''
                      ? item.libelle1
                      : item.libelle1 + '<br />' + item.libelle2,
        swImpressionExtourne : item.swImpressionExtourne,
        debitString : numeral(item.debit).format('0,0.00 $'),
        creditString : numeral(item.credit).format('0,0.00 $'),
        soldeString : numeral(item.solde).format('0,0.00 $'),
      } as EcritureCollective;
      ecrituresFinal.push(newEcriture);
    });
    return ecrituresFinal;
  }

  public computeEcritureCollectiveMontant(dto: DtoDC21Coll[]):
      EcritureCollectiveMontant {
    interface Ecr {
      debit: number;
      credit: number;
      solde: number;
    }
    const ecr: Ecr = {
      debit : 0,
      credit : 0,
      solde : 0,
    };
    dto.forEach(item => {
      ecr.debit += item.debit;
      ecr.credit += item.credit;
      ecr.solde += item.solde;
    });
    const newEcriture = {
      debit : ecr.debit,
      credit : ecr.credit,
      solde : ecr.solde,
      debitString : numeral(ecr.debit).format('0,0.00 $'),
      creditString : numeral(ecr.credit).format('0,0.00 $'),
      soldeString : numeral(ecr.solde).format('0,0.00 $'),
    } as EcritureCollectiveMontant;
    return newEcriture;
  }
}
