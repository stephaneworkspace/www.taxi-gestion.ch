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
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SortDescriptor} from '@progress/kendo-data-query';
import * as moment from 'moment';
// import { map } from 'rxjs/operators';
import numeral from 'numeral';
import {Observable} from 'rxjs';
import {
  DtoTGZ001OutDC10CompteForList as DtoDC10
} from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';
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

@Injectable({providedIn : 'root'})
export class TGZ001AffichageService {
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
    return this.http.get<DtoDC10[]>(this.baseUrl + 'TGZ001Affichage/comptes',
                                    this.httpOptions);
  }

  public computeArrayStringPlanComptable(dto: DtoDC10[]): string[] {
    let array: string[];
    array = new Array();
    dto.forEach(element => {
      array.push(element.noCompte.toString() + ' ' + element.texte);
    });
    return array;
  }

  public computeArrayString6PlanComptable(dto: DtoDC10[]): string[] {
    let array: string[];
    array = new Array();
    dto.forEach(element => { array.push(element.noCompte.toString()); });
    return array;
  }
}
