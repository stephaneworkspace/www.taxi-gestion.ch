import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { DtoTGA002OutDA21ConfigForSelect as Dto } from '../../_dto/TGA/DtoTGA002OutDA21ConfigForSelect';

import { TGA002ConfigService as Service } from '../../_services/TGA002ConfigService';


@Injectable()
export class ConfigResolver implements Resolve<Dto> {
    constructor(
        private service: Service,
        private router: Router,
        public snackBar: MatSnackBar) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Dto> {
        return this.service.getConfig().pipe(
            catchError(error => {
                switch (error.status) {
                    case 404:
                        this.snackBar.open('Erreur lors du chargement de la config' , 'Erreur Http', {
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