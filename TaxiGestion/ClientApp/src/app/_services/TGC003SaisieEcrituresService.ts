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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Pipe} from '@angular/core';
import * as moment from 'moment';
import numeral from 'numeral';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {
  DtoTGC003InpDC31EcrCollJournalForWriteEcrSimple as
  DtoDC31ForWriteEcritureSimple
} from '../_dto/TGC/DtoTGC003InpDC31EcrCollJournalForWriteEcrSimple';
import {
  DtoTGC003OutDC30EcritureJournalForList as DtoTGC003OutDC30ForList,
  DtoTGC003OutDC30EcritureJournalForListMod as DtoTGC003OutDC30ForListMod
} from '../_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';
import * as numberFillZero from '../_helper/number-fill-zero';

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

export interface EcrituresTotal {
  debitTotal: number;
  creditTotal: number;
  soldeTotal: number;
  debitTotalString: string;
  creditTotalString: string;
  soldeTotalString: string;
}

@Injectable(({
  providedIn : 'root',
}))
export class TGC003SaisieEcrituresService {
  private baseUrl = environment.apiUrl;
  private httpOptions = {};

  public constructor(private http: HttpClient) {}

  private setHeaders() {
    this.httpOptions = {
      headers : new HttpHeaders(
          {Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
  }

  public listeDesEcritures(): Observable<DtoTGC003OutDC30ForList[]> {
    this.setHeaders();
    return this.http.get<DtoTGC003OutDC30ForList[]>(
        this.baseUrl + 'TGC003SaisieEcritures/liste-des-ecritures/',
        this.httpOptions);
  }

  public computeListeDesEcritures(dto: DtoTGC003OutDC30ForList[]):
      DtoTGC003OutDC30ForListMod[] {
    let array: DtoTGC003OutDC30ForListMod[];
    array = new Array();
    let no: string;
    dto.forEach(element => {
      no = numberFillZero.pad(element.noEcritureCollectiveJournal, 6) +
           numberFillZero.pad(element.noEcritureJournal, 6);
      array.push({
        noSort : no,
        noEcritureCollectiveJournal : element.noEcritureCollectiveJournal,
        noEcritureJournal : element.noEcritureJournal,
        noEcritureJournalMod : element.noEcritureCollectiveJournal + '-' +
                                   element.noEcritureJournal,
        noCompteDebit : element.noCompteDebit,
        desiCompteDebit : element.desiCompteDebit,
        desiCompteDebitMod : element.desiCompteDebit !== null &&
                                     element.desiCompteDebit.length > 19
                                 ? element.desiCompteDebit.slice(0, 19) + '...'
                                 : element.desiCompteDebit,
        noCompteCredit : element.noCompteCredit,
        desiCompteCredit : element.desiCompteCredit,
        desiCompteCreditMod :
            element.desiCompteCredit !== null &&
                    element.desiCompteCredit.length > 19
                ? element.desiCompteCredit.slice(0, 19) + '...'
                : element.desiCompteCredit,
        dateEcriture : element.dateEcriture, // convertir avec moment.js à faire
        dateEcritureMoment : moment(element.dateEcriture).format('L'),
        noPiece : element.noPiece,
        libelle1 : element.libelle1,
        libelle2 : element.libelle2,
        montant : element.montant,
        montantString : numeral(element.montant).format('0,0.00 $'),
        debit : element.montant > 0 ? element.montant : 0,
        debitString : numeral(element.montant > 0 ? element.montant : 0)
                          .format('0,0.00 $'),
        credit : element.montant < 0 ? element.montant * -1 : 0,
        creditString : numeral(element.montant < 0 ? element.montant * -1 : 0)
                           .format('0,0.00 $'),
        swAutomatique : element.swAutomatique
      } as DtoTGC003OutDC30ForListMod);
    });
    return array;
  }

  public computeTotalEcritures(dto: DtoTGC003OutDC30ForListMod[]):
      EcrituresTotal {
    interface Total {
      debit: number;
      credit: number;
      solde: number;
    }
    const total: Total = {
      debit : 0.0,
      credit : 0.0,
      solde : 0.0,
    };
    dto.forEach(e => {
      total.debit += e.debit;
      total.credit += e.credit;
      total.solde += e.montant;
    });
    return {
      debitTotal : total.debit,
      creditTotal : total.credit,
      soldeTotal : total.solde,
      debitTotalString : numeral(total.debit).format('0,0.00 $'),
      creditTotalString : numeral(total.credit).format('0,0.00 $'),
      soldeTotalString : numeral(total.solde).format('0,0.00 $'),
    } as EcrituresTotal;
  }

  // changer pour un nom plus parlant quand j'avancerai
  public nouvelleEcritureSimple(dto: DtoDC31ForWriteEcritureSimple) {
    this.setHeaders();
    return this.http.post<DtoDC31ForWriteEcritureSimple>(
        this.baseUrl + 'TGC003SaisieEcritures/saisie-ecriture-simple/', dto,
        this.httpOptions);
  }
}
