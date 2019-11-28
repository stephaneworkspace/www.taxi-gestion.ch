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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Pipe} from '@angular/core';
import * as moment from 'moment';
import numeral from 'numeral';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
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

@Injectable(({
  providedIn : 'root',
}))
export class TGC002JournalisationService {
  private baseUrl = environment.apiUrl;
  private httpOptions = {};

  public constructor(private http: HttpClient) {}

  private setHeaders() {
    this.httpOptions = {
      headers : new HttpHeaders(
          {Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
  }

  // Ajouter le dto par la suite
  public journaliser() {
    this.setHeaders();
    return this.http.post(this.baseUrl + 'TGC002Journalisation/journaliser/',
                          null, this.httpOptions);
  }
}
