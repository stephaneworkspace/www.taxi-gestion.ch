import { Input, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";

@Component({
    selector: 'input-montant-form-field',
    templateUrl: './input-montant.html',
    styleUrls: ['./input-montant.scss'],
    providers: [
        CurrencyPipe,
    ]
})
export class InputMontantFormField {
    @Input() formGroup: FormGroup;
    @Input() fbMontant: string;
    private _touch: Boolean;
    get touch(): Boolean {
        return this._touch;
      }
    @Input()
    set touch(touch: Boolean) {
        this._touch = touch;
        if (touch)
            this.formGroup.get(this.fbMontant).markAsTouched();
    }

    constructor(private currencyPipe: CurrencyPipe) {}

    blurMontant() {
        let base = this.formGroup.get(this.fbMontant).value.toString().replace(/[^\d.-]/g, '');
        let re = /,/gi; 
        let str = this.currencyPipe.transform(base, 'CHF', '', '1.2-2');
        let newStr = str.replace(re, '\''); 
        this.formGroup.get(this.fbMontant).setValue(newStr);
      }
}
