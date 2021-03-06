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
import {CurrencyPipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector : 'app-input-montant-form-field',
  templateUrl : './input.component.html',
  styleUrls : [ './input.component.scss' ],
  providers : [
    CurrencyPipe,
  ]
})
export class InputMontantFormFieldComponent {
  @Input() formGroup: FormGroup;
  @Input() fbMontant: string;
  private pTouch: boolean;
  get touch(): boolean { return this.pTouch; }
  @Input()
  set touch(touch: boolean) {
    this.pTouch = touch;
    if (touch) {
      this.formGroup.get(this.fbMontant).markAsTouched();
    }
  }

  public constructor(private currencyPipe: CurrencyPipe) {}

  public blurMontant() {
    const base = this.formGroup.get(this.fbMontant)
                     .value.toString()
                     .replace(/[^\d.-]/g, '');
    const re = /,/gi;
    const str = this.currencyPipe.transform(base, 'CHF', '', '1.2-2');
    const newStr = str.replace(re, '\'');
    this.formGroup.get(this.fbMontant).setValue(newStr);
  }
}
