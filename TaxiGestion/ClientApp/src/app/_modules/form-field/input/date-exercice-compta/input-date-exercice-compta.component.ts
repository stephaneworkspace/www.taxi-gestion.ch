import { Input, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_helper/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material';

export enum TypeExericeCompta {
  Debut = 0,
  Fin = 1,
}

@Component({
    selector: 'app-input-date-exercice-compta-form-field',
    templateUrl: './input-date-exercice-compta.component.html',
    styleUrls: ['./input-date-exercice-compta.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
      ]
})
export class InputDateExerciceComptFormFieldComponent {
  @Input() type: TypeExericeCompta;
  @Input() formGroup: FormGroup;
  @Input() fbDate: string;
  // tslint:disable-next-line: variable-name
  private _touch: boolean;
  get touch(): boolean {
      return this._touch;
    }
  @Input()
  set touch(touch: boolean) {
      this._touch = touch;
      if (touch) {
          this.formGroup.get(this.fbDate).markAsTouched();
      }
  }

  // Datepicker start date
  startDate = new Date((new Date()).getFullYear(), this.type ? 1 : 12, this.type ? 1 : 31);

  // Datepicker with min & max validation
  minDate = new Date(2010, 0, 1);
  maxDate = new Date((new Date()).getFullYear() + 1, 31, 12);

  // Datepicker input and change events
  events: string[] = [];

  // Datepicker with filter validation
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}
