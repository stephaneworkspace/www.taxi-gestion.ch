import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TGA001AuthentificationService as Service } from 'src/app/_services/TGA001AuthentificationService';
import { Observable } from 'rxjs';
import { DtoTGA001InpDA01UserEmailForAvailable as Dto } from 'src/app/_dto/TGA/DtoTGA001InpDA01UserEmailForAvailable';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class EmailDisponibleValidator {
    constructor(
        private service: Service,
        public snackBar: MatSnackBar,
    ) { }
    validateEmail: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors> => {
        return new Promise((resolve, reject) => { 
            if (control.value == null)
                resolve(null);
            if (control.value.length > 2) {
            } else 
                resolve(null);
            let dto: Dto = {
                email: control.value
            } as Dto;
            this.service.EmailDisponible(dto).subscribe((res: boolean) => {
                if (!res)
                    resolve({ emailExiste: true });
                else 
                    resolve(null);
            }, error => {
                this.snackBar.open('Erreur lors de la vérification de l\'e-mail' , 'Erreur Http', {
                    duration: 7000,
                    panelClass: ['error-snackbar']
                });
                resolve(null);
            });
        });
    }
}

