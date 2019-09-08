    
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
// import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { DtoTGC001OutDC10CompteForList as Dto } from '../../_dto/TGC/DtoTGC001OutDC10CompteForList';

import { TGC001BilanService as Service } from '../../_services/TGC001BilanService';


@Injectable()
export class ComptabiliteBilanEcranResolver implements Resolve<Dto[]> {
    constructor(
        private service: Service,
        private router: Router,
        public snackBar: MatSnackBar) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Dto[]> {
        return this.service.getPlanComptable().pipe(
            catchError(error => {
                switch (error.status) {
                    case 404:
                        this.snackBar.open('Erreur lors du chargement du bilan' , 'Erreur Http', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/index']);
                        return of(null); 
                    default:
                        this.snackBar.open('Veuillez vous authentifier' , 'Sécurité', {
                            duration: 7000,
                            panelClass: ['error-snackbar']
                            });
                        this.router.navigate(['/login']);
                        return of(null); 
                }
            })
        );
    }
}