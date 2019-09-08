var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { DtoTGB001OutDB10CompteForList as DtoDB10 } from 'src/app/_dto/TGB/DtoTGB001OutDB10CompteForList';
//import { DtoTGB001OutDB21EcrituresJournalForList as DtoDB21 } from 'src/app/_dto/TGB/DtoTGB001OutDB21EcrituresJournalForList';
//import { DtoTGB001OutDB21EcrituresJournalForListColl as DtoDB21Coll } from 'src/app/_dto/TGB/DtoTGB001OutDB21EcrituresJournalForListColl';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
let TGA001AuthentificationService = class TGA001AuthentificationService {
    // headers_fix;
    constructor(http) {
        this.http = http;
        //jwtHelper = new JwtHelperService(); https://www.npmjs.com/package/@auth0/angular-jwt
        this.baseUrl = environment.apiUrl;
        // Headers
        this.httpOptions = {};
    }
    setHeaders() {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
    }
    login(model) {
        return this.http.post(this.baseUrl + 'TGA001Authentification/login', model).pipe(map((response) => {
            const user = response;
            if (user) {
                localStorage.setItem('token', user.token);
                // localStorage.setItem('user', JSON.stringify(user.user));
                // localStorage.setItem('messagesNonLu', JSON.stringify(user.messagesNonLu));
                // this.currentUser = user.user;
                // this.decodedToken = this.jwtHelper.decodeToken(user.token);
                // console.log(this.decodedToken);
            }
        }));
    }
};
TGA001AuthentificationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], TGA001AuthentificationService);
export { TGA001AuthentificationService };
/*
Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@stephaneworkspace
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.

 
0
0 0 stephaneworkspace/PartagesWebAngular
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Security  Insights  Settings
PartagesWebAngular/src/app/_services/auth.service.ts
@stephaneworkspace stephaneworkspace correction d'une erreur de mon instructeur sur udemy
b81681e on 13 May
We found potential security vulnerabilities in your dependencies.
Only the owner of this repository can see this message.

60 lines (51 sloc)  1.62 KB
    
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://51.77.201.204:5000/api/auth/';
  baseUrl = 'http://localhost:5000/api/Auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  // Headers
  httpOptions = {};

  constructor(private http: HttpClient) { }

  setHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('messagesNonLu', JSON.stringify(user.messagesNonLu));
          this.currentUser = user.user;
          // console.log(user.token)
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
*/ 
//# sourceMappingURL=TGA001AuthentificationService.js.map