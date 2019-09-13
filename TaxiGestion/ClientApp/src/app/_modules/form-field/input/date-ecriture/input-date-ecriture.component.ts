import { Input, Component, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_helper/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
    selector: 'input-date-ecriture-form-field',
    templateUrl: './input-date-ecriture.component.html',
    styleUrls: ['./input-date-ecriture.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
      ]
})
export class InputDateEcritureFormField {
    @Input() formGroup: FormGroup;
    @Input() fbDateEcriture: string;
    private _touch: Boolean;
    get touch(): Boolean {
        return this._touch;
      }
    @Input()
    set touch(touch: Boolean) {
        this._touch = touch;
        if (touch) 
            this.formGroup.get(this.fbDateEcriture).markAsTouched();
    }

  //Datepicker start date
  startDate = new Date(2019, 1, 1);

  //Datepicker with min & max validation
  minDate = new Date(2010, 0, 1);
  maxDate = new Date(2021, 0, 1);

  //Datepicker with filter validation
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  //Datepicker input and change events
  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}
