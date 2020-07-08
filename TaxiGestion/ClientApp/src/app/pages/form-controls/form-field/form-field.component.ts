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
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component(
    {selector : 'app-form-field', templateUrl : './form-field.component.html'})
export class FormFieldComponent implements OnInit {
  public options: FormGroup;
  public email = new FormControl('', [ Validators.required, Validators.email ]);
  public hide: boolean;
  public themingForm: FormGroup;
  private settings: Settings;
  public constructor(private appSettings: AppSettings,
                     private formBuilder: FormBuilder) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.hide = true;
    this.options = this.formBuilder.group({
      hideRequired : false,
      floatLabel : 'auto',
    });
    this.themingForm = this.formBuilder.group({
      color : 'primary',
      fontSize : [ 16, Validators.min(10) ],
    });
  }

  private getErrorMessage() {
    return this.email.hasError('required')
               ? 'You must enter a value'
               : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getFontSize() { return Math.max(10, this.themingForm.value.fontSize); }
}
