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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {
  DtoTGA002InpDA21ConfigForWrite
} from '../_dto/TGA/DtoTGA002InpDA21ConfigForWrite';
import {
  DtoTGA002OutDA21ConfigForSelect
} from '../_dto/TGA/DtoTGA002OutDA21ConfigForSelect';

@Injectable(({
  providedIn : 'root',
}))
export class TGA002ConfigService {
  private baseUrl = environment.apiUrl;
  private httpOptions = {};

  public constructor(private http: HttpClient) {}

  private setHeaders() {
    this.httpOptions = {
      headers : new HttpHeaders(
          {Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
  }

  public getConfig(): Observable<DtoTGA002OutDA21ConfigForSelect> {
    this.setHeaders();
    return this.http.get<DtoTGA002OutDA21ConfigForSelect>(
        this.baseUrl + 'TGA002Config/config', this.httpOptions);
  }

  public postConfig(dto: DtoTGA002InpDA21ConfigForWrite) {
    this.setHeaders();
    return this.http.post<DtoTGA002InpDA21ConfigForWrite>(
        this.baseUrl + 'TGA002Config/config', dto, this.httpOptions);
  }
}
