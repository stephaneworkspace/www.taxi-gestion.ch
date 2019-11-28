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
import {Injectable} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {
  DtoTGA001InpDA01UserEmailForAvailable as Dto
} from 'src/app/_dto/TGA/DtoTGA001InpDA01UserEmailForAvailable';
import {
  TGA001AuthentificationService as Service
} from 'src/app/_services/TGA001AuthentificationService';

@Injectable({providedIn : 'root'})
export class EmailDisponibleValidator {
  public constructor(
      private service: Service,
      public snackBar: MatSnackBar,
  ) {}
  public validateEmail: AsyncValidatorFn =
      (control: AbstractControl): Promise<ValidationErrors|null>|
      Observable<ValidationErrors> => {
        return new Promise((resolve, reject) => {
          if (control.value == null) {
            resolve(null);
          }
          if (control.value.length > 2) {
          } else {
            resolve(null);
          }
          const dto: Dto = {email : control.value} as Dto;
          this.service.EmailDisponible(dto).subscribe(
              (res: boolean) => {
                if (!res) {
                  resolve({emailExiste : true});
                } else {
                  resolve(null);
                }
              },
              error => {
                this.snackBar.open(
                    'Erreur lors de la vérification de l\'e-mail',
                    'Erreur Http',
                    {duration : 7000, panelClass : [ 'error-snackbar' ]});
                resolve(null);
              });
        });
      }
}
