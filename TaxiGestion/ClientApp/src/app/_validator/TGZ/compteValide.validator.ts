import { AbstractControl, ValidationErrors, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TGZ001AffichageService as Service } from 'src/app/_services/TGZ001AffichageService';
import { Observable } from 'rxjs';
import { DtoTGA001InpDA01UserEmailForAvailable as Dto } from 'src/app/_dto/TGA/DtoTGA001InpDA01UserEmailForAvailable';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

export function compteValidator(items: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value === null)
            return null;
        if (control.value.length >= 6) {
        } else 
            return null;
        //if (control.value !== undefined && (isNaN(control.value) || items.indexOf(control.value.slice(0, 6)) == -1)) {
        if (items.indexOf(control.value.slice(0, 6)) == -1) {
            return { 'noCompteInvalide': true };
        }
        return null;
    };
}

@Injectable({
    providedIn: 'root'
})
export class CompteValideValidator {
    constructor(
        private service: Service,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
    ) { }
    validateNoCompte: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors> => {
        return new Promise((resolve, reject) => { 
            if (control.value == null)
                resolve(null);
            if (control.value.length >= 6) {
            } else 
                resolve(null);
            console.log(control);
            this.route.data.subscribe(data => {
                let res = this.service.computeArrayStringPlanComptable(data['planComptable']);
                console.log(res);
                if (res.indexOf(control.value.slice(0, 6)) == -1)
                    resolve({ noCompteInvalide: true });
                else 
                    resolve(null);
            });
        });
    }
}

