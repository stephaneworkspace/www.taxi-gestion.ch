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
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component(
    {selector : 'app-form-field', templateUrl : './form-field.component.html'})
export class FormFieldComponent implements OnInit {
  private options: FormGroup;
  private email =
      new FormControl('', [ Validators.required, Validators.email ]);
  private hide: boolean;
  private themingForm: FormGroup;
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

  private getFontSize() {
    return Math.max(10, this.themingForm.value.fontSize);
  }
}
