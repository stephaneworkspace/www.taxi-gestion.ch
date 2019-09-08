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
import { Router } from '@angular/router';
// import { AlertifyService } from '../_services/alertify.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TGC001BilanService as Service } from '../../_services/TGC001BilanService';
let ComptabiliteBilanEcranResolver = class ComptabiliteBilanEcranResolver {
    constructor(service, router, snackBar) {
        this.service = service;
        this.router = router;
        this.snackBar = snackBar;
    }
    resolve(route) {
        return this.service.getPlanComptable().pipe(catchError(error => {
            switch (error.status) {
                case 404:
                    this.snackBar.open('Erreur lors du chargement du bilan', 'Erreur Http', {
                        duration: 7000,
                        panelClass: ['error-snackbar']
                    });
                    this.router.navigate(['/index']);
                    return of(null);
                default:
                    this.snackBar.open('Veuillez vous authentifier', 'Sécurité', {
                        duration: 7000,
                        panelClass: ['error-snackbar']
                    });
                    this.router.navigate(['/login']);
                    return of(null);
            }
        }));
    }
};
ComptabiliteBilanEcranResolver = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Service,
        Router,
        MatSnackBar])
], ComptabiliteBilanEcranResolver);
export { ComptabiliteBilanEcranResolver };
//# sourceMappingURL=bilan-ecran.resolver.js.map