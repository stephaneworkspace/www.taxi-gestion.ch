import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TGC003SaisieEcrituresService as Service } from '../../_services/TGC003SaisieEcrituresService';
import { DtoTGC003OutDC30EcritureJournalForListMod as Dto } from 'src/app/_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';


@Injectable()
export class ComptabiliteListeEcrituresResolver implements Resolve<Dto[]> {
    constructor(
        private service: Service,
        private router: Router,
        public snackBar: MatSnackBar) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Dto[]> {
        return this.service.listeDesEcritures().pipe(
            catchError(error => {
                switch (error.status) {
                    case 404:
                        this.snackBar.open('Erreur lors du chargement de la liste d\'écritures' , 'Erreur Http', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/index']);
                        return of(null); 
                    case 401:
                        this.snackBar.open('Veuillez vous authentifier' , 'Sécurité', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/login']);
                        return of(null); 
                    default:
                        this.snackBar.open('Erreur lors du chargement de la liste d\'écritures' , 'Erreur Http', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/index']);
                        return of(null); 
                }
            })
        );
    }
}