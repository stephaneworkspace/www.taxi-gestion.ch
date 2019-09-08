import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { npa4Data } from 'src/app/_data/TGA/npa.data';

@Injectable({
    providedIn: 'root'
})
export class NpaValidator {
    validateNpa: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors> => {
        return new Promise((resolve, reject) => { 
            if (control.value == null)
                resolve(null);
            if (control.value.length >= 4) {
            } else 
                resolve(null);
            if (npa4Data.indexOf(control.value.slice(0, 4)) == -1)
                resolve({ npaGeneve: true });
            else 
                resolve(null);
        });
    }
}

