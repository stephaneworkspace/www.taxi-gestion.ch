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

@Component({
  selector : 'app-user-info',
  templateUrl : './user-info.component.html',
  styleUrls : [ './user-info.component.scss' ]
})
export class UserInfoComponent implements OnInit {
  private personalForm: FormGroup;
  private salutations = [ {id : 1, name: 'Mr'}, {id : 2, name: 'Mrs'} ];
  private genders = [ {id : 1, name: 'Male'}, {id : 2, name: 'Female'} ];
  private countries = [
    {id : 1, name: 'USA'}, {id : 2, name: 'Canada'}, {id : 3, name: 'Mexico'},
    {id : 4, name: 'UK'}, {id : 5, name: 'France'}, {id : 6, name: 'Italy'}
  ];
  private states = [
    {id : 1, name: 'Arkansas'}, {id : 2, name: 'Texas'},
    {id : 3, name: 'California'}, {id : 4, name: 'Florida'},
    {id : 5, name: 'Other'}
  ];

  public constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.personalForm = this.formBuilder.group({
      salutation : [ '' ],
      firstname : [ '', Validators.required ],
      lastname : [ '', Validators.required ],
      gender : [ '' ],
      email :
          [ '', Validators.compose([ Validators.required, emailValidator ]) ],
      phone : [ '', Validators.required ],
      zipcode : [ '', Validators.required ],
      country : [ '', Validators.required ],
      state : [ '' ],
      address : [ '' ]
    });
  }

  private onSubmit(values: object): void {
    if (this.personalForm.valid) {
      // this.router.navigate(['pages/dashboard']);
    }
  }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return {invalidEmail : true};
  }
}
