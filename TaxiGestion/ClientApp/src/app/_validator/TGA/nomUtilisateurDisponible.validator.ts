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
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
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
  DtoTGA001InpDA01UserForAvailable as Dto
} from 'src/app/_dto/TGA/DtoTGA001InpDA01UserForAvailable';
import {
  TGA001AuthentificationService as Service
} from 'src/app/_services/TGA001AuthentificationService';

@Injectable({providedIn : 'root'})
export class NomUtilisateurDisponibleValidator {
  public constructor(
      private service: Service,
      public snackBar: MatSnackBar,
  ) {}
  public validateNomUtilisateur: AsyncValidatorFn =
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
          const dto: Dto = {nomUtilisateur : control.value} as Dto;
          this.service.NomUtilisateurDisponible(dto).subscribe(
              (res: boolean) => {
                if (!res) {
                  resolve({nomUtilisateurExiste : true});
                } else {
                  resolve(null);
                }
              },
              error => {
                this.snackBar.open(
                    'Erreur lors de la vérification de l\'utilisateur',
                    'Erreur Http',
                    {duration : 7000, panelClass : [ 'error-snackbar' ]});
                resolve(null);
              });
        });
      }
}
