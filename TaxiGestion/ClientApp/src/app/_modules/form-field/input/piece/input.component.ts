/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; the source ode is released under and Creative
 * Commons License.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {
  APP_DATE_FORMATS,
  AppDateAdapter
} from 'src/app/_helper/format-datepicker';

@Component({
  selector : 'app-input-piece-form-field',
  templateUrl : './input.component.html',
  styleUrls : [ './input.component.scss' ],
  providers : [
    {provide : DateAdapter, useClass : AppDateAdapter},
    {provide : MAT_DATE_FORMATS, useValue : APP_DATE_FORMATS},
  ]
})
export class InputPieceFormFieldComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() fbNoPiece: string;
  @Input() fbDatePiece: string;
  private pTouch: boolean;
  get touch(): boolean { return this.pTouch; }
  @Input()
  set touch(touch: boolean) {
    this.pTouch = touch;
    if (touch) {
      this.formGroup.get(this.fbNoPiece).markAsTouched();
      this.formGroup.get(this.fbDatePiece).markAsTouched();
    }
  }

  public placeholderNoPiece: string;

  // Datepicker start date
  private startDate = new Date(2019, 1, 1);

  // Datepicker with min & max validation
  public minDate = new Date(2010, 0, 1);
  public maxDate = new Date(2021, 0, 1);

  // Datepicker input and change events
  events: string[] = [];

  public ngOnInit(): void {
    // OnChange n°
    this.placeholderNoPiece = 'N°';
    this.formGroup.get(this.fbNoPiece).valueChanges.subscribe(val => {
      if (val > 0) {
        this.placeholderNoPiece = 'N° de pièce';
      } else {
        this.placeholderNoPiece = 'N°';
      }
    });
  }

  // Datepicker with filter validation
  private myFilter = (d: Date):
      boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      }

  private addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  public aFaire(): void { alert('À faire'); }

  public blurNoPiece() {
    const re = /[^0-9]/g;
    let str = this.formGroup.get(this.fbNoPiece).value;
    if (str == null) {
      str = '';
    }
    const newStr = str.toString().replace(re, '');
    this.formGroup.get(this.fbNoPiece).setValue(newStr);
  }
}
