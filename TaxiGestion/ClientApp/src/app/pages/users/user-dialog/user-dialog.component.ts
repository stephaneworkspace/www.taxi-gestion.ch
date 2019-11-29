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
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {
  User,
  UserContacts,
  UserProfile,
  UserSettings,
  UserSocial,
  UserWork
} from '../user.model';

@Component({
  selector : 'app-user-dialog',
  templateUrl : './user-dialog.component.html',
  styleUrls : [ './user-dialog.component.scss' ]
})
export class UserDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean;
  public constructor(private dialogRef: MatDialogRef<UserDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public user: User,
                     private fb: FormBuilder) {
    this.form = this.fb.group({
      id : null,
      username : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(5) ])
      ],
      password : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(6) ])
      ],
      profile : this.fb.group({
        name : null,
        surname : null,
        birthday : null,
        gender : null,
        image : null
      }),
      work : this.fb.group({company : null, position : null, salary : null}),
      contacts : this.fb.group({email : null, phone : null, address : null}),
      social : this.fb.group({facebook : null, twitter : null, google : null}),
      settings : this.fb.group({
        isActive : null,
        isDeleted : null,
        registrationDate : null,
        joinedDate : null
      })
    });
  }

  public ngOnInit() {
    this.passwordHide = true;
    if (this.user) {
      this.form.setValue(this.user);
    } else {
      this.user = new User();
      this.user.profile = new UserProfile();
      this.user.work = new UserWork();
      this.user.contacts = new UserContacts();
      this.user.social = new UserSocial();
      this.user.settings = new UserSettings();
    }
  }

  public close(): void { this.dialogRef.close(); }
}
