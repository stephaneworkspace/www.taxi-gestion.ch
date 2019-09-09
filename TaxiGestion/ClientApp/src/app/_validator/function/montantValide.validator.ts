import { AbstractControl, ValidatorFn } from '@angular/forms';

export function montantValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value === null)
            return null;
        if (control.value == '')
            return null;
        if (control.value == 0) {
            return { 'montantInvalide': true };
        }
        return null;
    };
}

