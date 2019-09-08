import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DtoTGZ001OutDC10CompteForList as DtoDC10 } from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';

import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import numeral from 'numeral';
import * as moment from 'moment';
import { SortDescriptor } from '@progress/kendo-data-query';

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
//numeral.defaultFormat('0,0[.]00 $');

// moment
moment.locale('fr-ch');


@Injectable({
  providedIn: 'root'
})
export class TGZ001AffichageService {
  baseUrl = environment.apiUrl;
  httpOptions = {};

  constructor(private http: HttpClient) {}

  setHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  getPlanComptable(): Observable<DtoDC10[]> {
    this.setHeaders();
    return this.http.get<DtoDC10[]>(this.baseUrl + 'TGZ001Affichage/comptes', this.httpOptions);
  }

  computeArrayStringPlanComptable(dto: DtoDC10[]): string[] {
    let array: string[];
    array = new Array();
    dto.forEach(element => {
        array.push(element.noCompte.toString() + ' ' + element.texte)
    });
    return array;
  }

  computeArrayString6PlanComptable(dto: DtoDC10[]): string[] {
    let array: string[];
    array = new Array();
    dto.forEach(element => {
        array.push(element.noCompte.toString())
    });
    return array;
  }
}