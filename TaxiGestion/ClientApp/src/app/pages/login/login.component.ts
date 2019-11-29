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
import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {
  TGA001AuthentificationService
} from 'src/app/_services/TGA001AuthentificationService';

import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {emailValidator} from '../../theme/utils/app-validators';

@Component({selector : 'app-login', templateUrl : './login.component.html'})
export class LoginComponent implements AfterViewInit {
  private model: any = {};
  public form: FormGroup;
  private settings: Settings;
  public constructor(private appSettings: AppSettings, private fb: FormBuilder,
                     private router: Router,
                     private authService: TGA001AuthentificationService,
                     private snackBar: MatSnackBar) {
    localStorage.removeItem('token');
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      nomUtilisateur : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(3) ])
      ],
      motDePasse : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(6) ])
      ]
    });
  }

  public ngAfterViewInit() { this.settings.loadingSpinner = false; }

  public onSubmit(values: object): void {
    if (this.form.valid) {
      // peut être que ce bout de code est inutile avec model: any = {};
      this.model = {
        nomUtilisateur : this.form.controls.nomUtilisateur.value,
        motDePasse : this.form.controls.motDePasse.value
      };
      this.authService.login(this.model)
          .subscribe(
              next => {
                this.snackBar.open(
                    'Login avec succès', 'Message',
                    {duration : 2000, panelClass : [ 'success-snackbar' ]});
                this.router.navigate([ '/index' ]);
              },
              error => {
                console.log(error);
                this.snackBar.open(
                    'Erreur lors du login', 'Erreur Http',
                    {duration : 7000, panelClass : [ 'error-snackbar' ]});
                // this.router.navigate(['/members']);
              });
      // this.router.navigate(['/index']);
    }
  }
}
