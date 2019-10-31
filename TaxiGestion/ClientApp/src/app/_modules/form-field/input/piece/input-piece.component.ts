import { Input, Component, EventEmitter, Output, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_helper/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
    selector: 'input-piece-form-field',
    templateUrl: './input-piece.component.html',
    styleUrls: ['./input-piece.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
      ]
})
export class InputPieceFormField implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() fbNoPiece: string;
  @Input() fbDatePiece: string;
  private _touch: Boolean;
  get touch(): Boolean {
      return this._touch;
    }
  @Input()
  set touch(touch: Boolean) {
      this._touch = touch;
      if (touch) {
          this.formGroup.get(this.fbNoPiece).markAsTouched();
          this.formGroup.get(this.fbDatePiece).markAsTouched();
      }
  }

  public placeholderNoPiece: string = "N°";

  //Datepicker start date
  startDate = new Date(2019, 1, 1);

  //Datepicker with min & max validation
  minDate = new Date(2010, 0, 1);
  maxDate = new Date(2021, 0, 1);

  ngOnInit(): void {
    // OnChange n°
    this.formGroup.get(this.fbNoPiece).valueChanges.subscribe(val => {
      if (val > 0)
        this.placeholderNoPiece = "N° de pièce";
      else
        this.placeholderNoPiece = "N°"
    });
  }

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

  aFaire(): void {
    alert('À faire')
  }

  blurNoPiece() {
    let re = /[^0-9]/g;
    let str = this.formGroup.get(this.fbNoPiece).value;
    if (str == null)
      str = '';
    let newStr = str.toString().replace(re, '');
    this.formGroup.get(this.fbNoPiece).setValue(newStr);
  }
}
