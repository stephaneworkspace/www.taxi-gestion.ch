import { Input, Component, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'input-libelle-form-field',
    templateUrl: './input-libelle.component.html',
    styleUrls: ['./input-libelle.component.scss'],
})
export class InputLibelleFormField {
    @Input() formGroup: FormGroup;
    @Input() fbLibelle1: string;
    @Input() fbLibelle2: string;
    private _touch: Boolean;
    get touch(): Boolean {
        return this._touch;
      }
    @Input()
    set touch(touch: Boolean) {
        this._touch = touch;
        if (touch) {
            this.formGroup.get(this.fbLibelle1).markAsTouched();
            this.formGroup.get(this.fbLibelle2).markAsTouched();
        }
    }
    @Output() output: EventEmitter<string[]> = new EventEmitter<string[]>(); // [0] ligne 1 - [1] ligne 2

    blurLibelle1() {
        this.output.emit([this.formGroup.get(this.fbLibelle1).value,'']);
    }

    blurLibelle2() {
        this.output.emit(['',this.formGroup.get(this.fbLibelle2).value]);
    }

    selectionListeLibelle() {
        alert('À faire');
        // this.output.emit([this.formGroup.get(this.fbLibelle1).value,this.formGroup.get(this.fbLibelle2).value]);
    }
}
