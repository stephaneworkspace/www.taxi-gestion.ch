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
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {
  APP_DATE_FORMATS,
  AppDateAdapter
} from 'src/app/_helper/format-datepicker';

@Component({
  selector : 'app-input-date-ecriture-form-field',
  templateUrl : './input.component.html',
  styleUrls : [ './input.component.scss' ],
  providers : [
    {provide : DateAdapter, useClass : AppDateAdapter},
    {provide : MAT_DATE_FORMATS, useValue : APP_DATE_FORMATS},
  ]
})
export class InputDateEcritureFormFieldComponent {
  @Input() formGroup: FormGroup;
  @Input() fbDateEcriture: string;
  private pTouch: boolean;
  get touch(): boolean { return this.pTouch; }
  @Input()
  set touch(touch: boolean) {
    this.pTouch = touch;
    if (touch) {
      this.formGroup.get(this.fbDateEcriture).markAsTouched();
    }
  }

  // Datepicker start date
  private startDate = new Date(2019, 1, 1);

  // Datepicker with min & max validation
  private minDate = new Date(2010, 0, 1);
  private maxDate = new Date(2021, 0, 1);

  private events: string[] = [];

  // Datepicker with filter validation
  private myFilter = (d: Date):
      boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      }

  // Datepicker input and change events
  private addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}
