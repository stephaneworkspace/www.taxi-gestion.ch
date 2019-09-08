import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { DtoTGB001OutDB10CompteForList as DtoDB10 } from 'src/app/_dto/TGB/DtoTGB001OutDB10CompteForList';
//import { DtoTGB001OutDB21EcrituresJournalForList as DtoDB21 } from 'src/app/_dto/TGB/DtoTGB001OutDB21EcrituresJournalForList';
//import { DtoTGB001OutDB21EcrituresJournalForListColl as DtoDB21Coll } from 'src/app/_dto/TGB/DtoTGB001OutDB21EcrituresJournalForListColl';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription } from '../_dto/TGA/DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription';
import { DtoTGA001InpDA01UserForAvailable } from '../_dto/TGA/DtoTGA001InpDA01UserForAvailable';
import { DtoTGA001InpDA01UserEmailForAvailable } from '../_dto/TGA/DtoTGA001InpDA01UserEmailForAvailable';
import { DtoTGA001InpDA01UtilisateurPourInscription } from '../_dto/TGA/DtoTGA001InpDA01UtilisateurPourInscription';

@Injectable({
    providedIn: 'root'
})
export class TGA001AuthentificationService {
  //jwtHelper = new JwtHelperService(); https://www.npmjs.com/package/@auth0/angular-jwt
  baseUrl = environment.apiUrl;

  // Headers
  httpOptions = {};
  // headers_fix;

  constructor(private http: HttpClient) {}

  setHeaders() {
      this.httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      };
  }

  login(model: any) {
      return this.http.post(this.baseUrl + 'TGA001Authentification/login', model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            // localStorage.setItem('user', JSON.stringify(user.user));
            // localStorage.setItem('messagesNonLu', JSON.stringify(user.messagesNonLu));
            // this.currentUser = user.user;
            // this.decodedToken = this.jwtHelper.decodeToken(user.token);
            // console.log(this.decodedToken);
        }
      })
    );
  }

  inscription(dto: DtoTGA001InpDA01UtilisateurPourInscription) {
    return this.http.post<DtoTGA001InpDA01UtilisateurPourInscription>(this.baseUrl + 'TGA001Authentification/inscription/', dto, this.httpOptions);
  }

  EmailConfirmationInscription(idUtilisateur: number, code: string) {
    return this.http.post<DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription>(this.baseUrl + 'TGA001Authentification/email-confirmation-inscription/' + idUtilisateur + '/' + code, this.httpOptions);
  }

  NomUtilisateurDisponible(dto: DtoTGA001InpDA01UserForAvailable) {
    return this.http.post<boolean>(this.baseUrl + 'TGA001Authentification/utilisateur-disponible/', dto, this.httpOptions);
  }

  EmailDisponible(dto: DtoTGA001InpDA01UserEmailForAvailable) {
    return this.http.post<boolean>(this.baseUrl + 'TGA001Authentification/email-disponible/', dto, this.httpOptions);
  }
}