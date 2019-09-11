import { Injectable, Pipe } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple as DtoDC31ForWriteEcritureSimple } from '../_dto/TGC/DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple';
import { DtoTGC003OutDC30EcritureJournalForList, DtoTGC003OutDC30EcritureJournalForListMod } from '../_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';
import { Observable } from 'rxjs';
import * as numberFillZero from '../_helper/number-fill-zero';
import * as moment from 'moment';
import numeral from 'numeral';
try {
  numeral.register('locale', 'fr-ch', {
    delimiters: {
        thousands: '\'',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'CHF'
    }
  });
  // switch between locales
  numeral.locale('fr-ch'); // http://numeraljs.com/#custom-formats fr-ch
} catch (e) {}

// moment
moment.locale('fr-ch')

export interface EcrituresTotal {
    debitTotal: number;
    creditTotal: number;
    soldeTotal: number;
    debitTotalString: string;
    creditTotalString: string;
    soldeTotalString: string;
}

@Injectable(({
    providedIn: 'root',
}))
export class TGC003SaisieEcrituresService {
    baseUrl = environment.apiUrl;
    httpOptions = {};

    constructor(private http: HttpClient) {
    }

    setHeaders() {
        this.httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        };
    }

    listeDesEcritures(): Observable<DtoTGC003OutDC30EcritureJournalForList[]> {
        this.setHeaders();
        return this.http.get<DtoTGC003OutDC30EcritureJournalForList[]>(this.baseUrl + 'TGC003SaisieEcritures/liste-des-ecritures/', this.httpOptions);
    }

    computeListeDesEcritures(dto: DtoTGC003OutDC30EcritureJournalForList[]): DtoTGC003OutDC30EcritureJournalForListMod[] {
        let array: DtoTGC003OutDC30EcritureJournalForListMod[];
        array = new Array();
        dto.forEach(element => {
            let noSort: string = numberFillZero.pad(element.noEcritureCollectiveJournal, 6) + numberFillZero.pad(element.noEcritureJournal, 6);
            array.push({
                noSort: noSort,
                noEcritureCollectiveJournal: element.noEcritureCollectiveJournal,
                noEcritureJournal: element.noEcritureJournal,
                noEcritureJournalMod: element.noEcritureCollectiveJournal + '-' + element.noEcritureJournal,
                noCompteDebit: element.noCompteDebit,
                desiCompteDebit: element.desiCompteDebit,
                desiCompteDebitMod: element.desiCompteDebit !== null && element.desiCompteDebit.length > 19 ? element.desiCompteDebit.slice(0, 19) + '...' : element.desiCompteDebit,
                noCompteCredit: element.noCompteCredit,
                desiCompteCredit: element.desiCompteCredit,
                desiCompteCreditMod: element.desiCompteCredit !== null && element.desiCompteCredit.length > 19 ? element.desiCompteCredit.slice(0, 19) + '...' : element.desiCompteCredit,
                dateEcriture: element.dateEcriture, // convertir avec moment.js à faire
                dateEcritureMoment: moment(element.dateEcriture).format("L"),
                noPiece: element.noPiece,
                libelle1: element.libelle1,
                libelle2: element.libelle2,
                montant: element.montant,
                montantString: numeral(element.montant).format('0,0.00 $'),
                debit: element.montant > 0 ? element.montant : 0,
                debitString: numeral(element.montant > 0 ? element.montant : 0).format('0,0.00 $'),
                credit: element.montant < 0 ? element.montant * - 1 : 0,
                creditString: numeral(element.montant < 0 ? element.montant * - 1 : 0).format('0,0.00 $'),
                swAutomatique: element.swAutomatique
            } as DtoTGC003OutDC30EcritureJournalForListMod)
        });
        return array;
    }

    computeTotalEcritures(dto: DtoTGC003OutDC30EcritureJournalForListMod[]): EcrituresTotal
    {
        let debitTotal: number = 0.0;
        let creditTotal: number = 0.0;
        let soldeTotal: number = 0.0;
        dto.forEach(e => {
            debitTotal += e.debit;
            creditTotal += e.credit;
            soldeTotal += e.montant;
        });
        let item = {
            debitTotal: debitTotal,
            creditTotal: creditTotal,
            soldeTotal: soldeTotal,
            debitTotalString: numeral(debitTotal).format('0,0.00 $'),
            creditTotalString: numeral(creditTotal).format('0,0.00 $'),
            soldeTotalString: numeral(soldeTotal).format('0,0.00 $'),
        } as EcrituresTotal;
        return item;
    }

    // changer pour un nom plus parlant quand j'avancerai
    nouvelleEcritureSimple(dto: DtoDC31ForWriteEcritureSimple) {
        this.setHeaders();
        return this.http.post<DtoDC31ForWriteEcritureSimple>(this.baseUrl + 'TGC003SaisieEcritures/saisie-ecriture-simple/', dto, this.httpOptions);
    }
}