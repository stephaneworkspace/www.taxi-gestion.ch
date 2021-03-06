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
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/operators';
import {
  DtoTGA001OutDA01UtilisateurForEmailConfirmationInscr as Dto
} from 'src/app/_dto/TGA/DtoTGA001OutDA01UtilisateurForEmailConfirmationInscr';

import {
  TGA001AuthentificationService as Service
} from '../../_services/TGA001AuthentificationService';

@Injectable()
export class EmailConfirmationInscriptionResolver implements Resolve<Dto> {
  public constructor(private service: Service, private router: Router,
                     private snackBar: MatSnackBar) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Dto> {
    // BEGIN
    // https://stackoverflow.com/questions/40297165/angular-2-pass-a-value-to-the-route-data-resolve
    const row = [];
    let idUtilisateur = 0;
    let code: string;

    Object.keys(route.data).forEach(e => { row.push(route.data[e]); });

    const path: string = row[0];
    delete row[0];

    route.data = row;

    const ROUTE_ID_UTILISATEUR = 'idUtilisateur';
    const ROUTE_CODE = 'code';
    try {
      idUtilisateur = route.params[ROUTE_ID_UTILISATEUR];
      code = route.params[ROUTE_CODE];
    } catch (error) {
      idUtilisateur = 0;
      code = '';
    }
    // END

    return this.service.EmailConfirmationInscription(idUtilisateur, code)
        .pipe(catchError(error => {
          switch (error.status) {
          case 400:
            this.snackBar.open(
                'Le code n\'est pas valide', 'Sécurité',
                {duration : 7000, panelClass : [ 'error-snackbar' ]});
            this.router.navigate([ '/' ]);
            return of(null);
          default:
            this.snackBar.open(
                'Impossible de joindre le serveur', 'Erreur Http',
                {duration : 7000, panelClass : [ 'error-snackbar' ]});
            this.router.navigate([ '/' ]);
            return of(null);
          }
        }));
  }
}
