import { AbstractControl, ValidatorFn } from '@angular/forms';

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

