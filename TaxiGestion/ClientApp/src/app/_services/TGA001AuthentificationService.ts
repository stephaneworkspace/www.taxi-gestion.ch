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
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {
  DtoTGA001InpDA01UserEmailForAvailable
} from '../_dto/TGA/DtoTGA001InpDA01UserEmailForAvailable';
import {
  DtoTGA001InpDA01UserForAvailable
} from '../_dto/TGA/DtoTGA001InpDA01UserForAvailable';
import {
  DtoTGA001InpDA01UtilisateurPourInscription
} from '../_dto/TGA/DtoTGA001InpDA01UtilisateurPourInscription';
import {
  DtoTGA001OutDA01UtilisateurForEmailConfirmationInscr
} from '../_dto/TGA/DtoTGA001OutDA01UtilisateurForEmailConfirmationInscr';

@Injectable({providedIn : 'root'})
export class TGA001AuthentificationService {
  private baseUrl = environment.apiUrl;
  private httpOptions = {};

  public constructor(private http: HttpClient) {}

  private setHeaders() {
    this.httpOptions = {
      headers : new HttpHeaders(
          {Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
  }

  public login(model: any) {
    return this.http.post(this.baseUrl + 'TGA001Authentification/login', model)
        .pipe(map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        }));
  }

  public inscription(dto: DtoTGA001InpDA01UtilisateurPourInscription) {
    return this.http.post<DtoTGA001InpDA01UtilisateurPourInscription>(
        this.baseUrl + 'TGA001Authentification/inscription/', dto,
        this.httpOptions);
  }

  public EmailConfirmationInscription(idUtilisateur: number, code: string) {
    return this.http.post<DtoTGA001OutDA01UtilisateurForEmailConfirmationInscr>(
        this.baseUrl +
            'TGA001Authentification/email-confirmation-inscription/' +
            idUtilisateur + '/' + code,
        this.httpOptions);
  }

  public NomUtilisateurDisponible(dto: DtoTGA001InpDA01UserForAvailable) {
    return this.http.post<boolean>(
        this.baseUrl + 'TGA001Authentification/utilisateur-disponible/', dto,
        this.httpOptions);
  }

  public EmailDisponible(dto: DtoTGA001InpDA01UserEmailForAvailable) {
    return this.http.post<boolean>(
        this.baseUrl + 'TGA001Authentification/email-disponible/', dto,
        this.httpOptions);
  }
}
