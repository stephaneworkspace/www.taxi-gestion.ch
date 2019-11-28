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
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {npaCompletData} from 'src/app/_data/TGA/npa.data';
import {
  DtoTGA001InpDA01UtilisateurPourInscription
} from 'src/app/_dto/TGA/DtoTGA001InpDA01UtilisateurPourInscription';
import {
  TGA001AuthentificationService as Service
} from 'src/app/_services/TGA001AuthentificationService';
import {
  EmailDisponibleValidator
} from 'src/app/_validator/TGA/emailDisponible.validator';
import {
  NomUtilisateurDisponibleValidator
} from 'src/app/_validator/TGA/nomUtilisateurDisponible.validator';
import {NpaValidator} from 'src/app/_validator/TGA/npa.validator';

import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {
  emailValidator,
  matchingPasswords
} from '../../theme/utils/app-validators';

@Component({
  selector : 'app-register',
  templateUrl : './register.component.html',
  styleUrls : [ './register.component.scss' ],
})
export class RegisterComponent implements OnInit, AfterViewInit {

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public settings: Settings;
  public filteredOptions: Observable<string[]>;
  public matErrorNomUtilisateurDisponible: string;
  public matErrorEmailDisponible: string;
  public matErrorNpaGeneve: string;
  public swDisabled = false;

  public constructor(private appSettings: AppSettings, private fb: FormBuilder,
                     private router: Router, private service: Service,
                     private snackBar: MatSnackBar,
                     private nomUtilisateurDisponibleValidator:
                         NomUtilisateurDisponibleValidator,
                     private emailDisponibleValidator: EmailDisponibleValidator,
                     private npaValidator: NpaValidator) {
    this.settings = this.appSettings.settings;
    this.firstFormGroup = this.fb.group({
      nomUtilisateur : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(2) ]),
        [ this.nomUtilisateurDisponibleValidator.validateNomUtilisateur ]
      ],
      email : [
        null, Validators.compose([ Validators.required, emailValidator ]),
        [ this.emailDisponibleValidator.validateEmail ]
      ],
      motDePasse : [
        '', Validators.compose([ Validators.required, Validators.minLength(6) ])
      ],
      confirmMotDePasse : [
        '', Validators.compose([ Validators.required, Validators.minLength(6) ])
      ]
    },
                                        {
                                          validator : matchingPasswords(
                                              'motDePasse', 'confirmMotDePasse')
                                        });
    this.secondFormGroup = this.fb.group({
      nomDeFamille : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(2) ])
      ],
      prenom : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(2) ])
      ],
      adresse : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(2) ])
      ],
      npa : [
        null,
        Validators.compose([ Validators.required, Validators.minLength(4) ]),
        [ this.npaValidator.validateNpa ]
      ],
    });
  }

  public ngOnInit() {
    this.matErrorNomUtilisateurDisponible = '';
    this.matErrorEmailDisponible = '';
    this.matErrorNpaGeneve = '';
    this.filteredOptions = this.secondFormGroup.get('npa').valueChanges.pipe(
        startWith(''), map(val => this.filter(val)));
    this.messageErreurNomUtilisateurDisponible();
    this.messageErreurEmailDisponible();
    this.messageErreurNpaGeneve();
  }

  public ngAfterViewInit() { this.settings.loadingSpinner = false; }

  filter(val): string[] {
    return npaCompletData.filter(
        option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  messageErreurNomUtilisateurDisponible() {
    this.firstFormGroup.get('nomUtilisateur').valueChanges.subscribe(val => {
      this.matErrorNomUtilisateurDisponible =
          'Le nom d\'utilisateur « ' + val + ' » est déjà utilisé';
    });
  }

  messageErreurEmailDisponible() {
    this.firstFormGroup.get('email').valueChanges.subscribe(val => {
      this.matErrorEmailDisponible =
          'L\'e-mail « ' + val + ' » est déjà utilisé';
    });
  }

  messageErreurNpaGeneve() {
    this.secondFormGroup.get('npa').valueChanges.subscribe(val => {
      this.matErrorNpaGeneve = 'Le npa « ' + val.slice(0, 4) +
                               ' » ne fait pas partie du canton de Genève';
    });
  }

  public onSubmit(values: object): void {
    if (this.firstFormGroup.valid) {
      this.router.navigate([ '/login' ]);
    }
  }

  btnClickInscription(): void {
    if (this.swDisabled === false && this.firstFormGroup.valid &&
        this.secondFormGroup.valid) {
      this.swDisabled = true;
      const model = {
        nomUtilisateur : this.firstFormGroup.controls.nomUtilisateur.value,
        email : this.firstFormGroup.controls.email.value,
        motDePasse : this.firstFormGroup.controls.motDePasse.value,
        nomDeFamille : this.secondFormGroup.controls.nomDeFamille.value,
        prenom : this.secondFormGroup.controls.prenom.value,
        adresse : this.secondFormGroup.controls.adresse.value,
        codePostal : this.secondFormGroup.controls.npa.value.slice(0, 4),
        lieu :
            (this.secondFormGroup.controls.npa.value.slice(4, 1) == null ||
                     this.secondFormGroup.controls.npa.value.slice(4, 1) === ' '
                 ? this.secondFormGroup.controls.npa.value.slice(5)
                 : this.secondFormGroup.controls.npa.value.slice(4))
      } as DtoTGA001InpDA01UtilisateurPourInscription;
      this.service.inscription(model).subscribe(
          next => {
            this.snackBar.open(
                'Vous allez recevoir un e-mail', 'Inscription',
                {duration : 7000, panelClass : [ 'success-snackbar' ]});
            this.router.navigate([ '/' ]);
          },
          error => {
            console.log(error);
            this.snackBar.open(
                'Erreur lors de l\'inscription', 'Erreur Http',
                {duration : 7000, panelClass : [ 'error-snackbar' ]});
            this.swDisabled = false;
          });
    }
  }
}
