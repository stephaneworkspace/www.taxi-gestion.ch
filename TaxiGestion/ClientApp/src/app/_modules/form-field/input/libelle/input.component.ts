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

@Component({
  selector : 'app-input-libelle-form-field',
  templateUrl : './input.component.html',
  styleUrls : [ './input.component.scss' ],
})
export class InputLibelleFormFieldComponent {
  @Input() formGroup: FormGroup;
  @Input() fbLibelle1: string;
  @Input() fbLibelle2: string;
  private pTouch: boolean;
  get touch(): boolean { return this.pTouch; }
  @Input()
  set touch(touch: boolean) {
    this.pTouch = touch;
    if (touch) {
      this.formGroup.get(this.fbLibelle1).markAsTouched();
      this.formGroup.get(this.fbLibelle2).markAsTouched();
    }
  }
  @Output()
  output: EventEmitter<string[]> =
      new EventEmitter<string[]>(); // [0] ligne 1 - [1] ligne 2

  private blurLibelle1() {
    this.output.emit([ this.formGroup.get(this.fbLibelle1).value, '' ]);
  }

  private blurLibelle2() {
    this.output.emit([ '', this.formGroup.get(this.fbLibelle2).value ]);
  }

  private selectionListeLibelle() {
    alert('À faire');
    // this.output.emit(
    // [this.formGroup.get(this.fbLibelle1).value,
    // this.formGroup.get(this.fbLibelle2).value]);
  }
}
