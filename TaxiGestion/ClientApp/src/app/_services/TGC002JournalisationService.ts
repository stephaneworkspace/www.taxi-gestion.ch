import { Injectable, Pipe } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

@Injectable(({
    providedIn: 'root',
}))
export class TGC002JournalisationService {
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

    // Ajouter le dto par la suite
    journaliser() {
        this.setHeaders();
        return this.http.post(this.baseUrl + 'TGC002Journalisation/journaliser/', null, this.httpOptions);
    }
}