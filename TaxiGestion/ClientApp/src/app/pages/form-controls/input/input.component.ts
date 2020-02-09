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
import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({selector : 'app-input', templateUrl : './input.component.html'})
export class InputComponent {
  private settings: Settings;
  // Input with a custom ErrorStateMatcher
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public matcher = new MyErrorStateMatcher();
  // Input with a clear button
  public value = 'Clear me';
  public constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl|null,
                      form: FormGroupDirective|NgForm|null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid &&
              (control.dirty || control.touched || isSubmitted));
  }
}
