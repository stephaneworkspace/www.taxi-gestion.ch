import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TGA001AuthentificationService as Service } from '../../_services/TGA001AuthentificationService';
import { DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription as Dto } from 'src/app/_dto/TGA/DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription';

@Injectable()
export class EmailConfirmationInscriptionResolver implements Resolve<Dto> {
    constructor(
        private service: Service,
        private router: Router,
        public snackBar: MatSnackBar) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Dto> {
        // BEGIN
        // https://stackoverflow.com/questions/40297165/angular-2-pass-a-value-to-the-route-data-resolve
        let row = [];
        let idUtilisateur = 0;
        let code = "";
    
        Object.keys(route.data).forEach(e => {
          row.push(route.data[e]);
        })
    
        let path: string = row[0];
        delete row[0];
    
        route.data = row;
    
        try {
            idUtilisateur = route.params['idUtilisateur'];
            code = route.params['code'];
        } catch (error) {
            idUtilisateur = 0;
            code = "";
        }
        // END

        return this.service.EmailConfirmationInscription(idUtilisateur, code).pipe(
            catchError(error => {
                switch (error.status) {
                    case 400:
                        this.snackBar.open('Le code n\'est pas valide' , 'Sécurité', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/']);
                        return of(null); 
                    default:
                        this.snackBar.open('Impossible de joindre le serveur' , 'Erreur Http', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/']);
                        return of(null); 
                }
            })
        );
    }
}