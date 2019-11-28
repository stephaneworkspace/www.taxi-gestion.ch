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
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {
  DtoTGA002OutDA21ConfigForSelect
} from 'src/app/_dto/TGA/DtoTGA002OutDA21ConfigForSelect';
import {
  DtoTGC003InpDC31EcrCollJournalForWriteEcrSimple as DtoDC31
} from 'src/app/_dto/TGC/DtoTGC003InpDC31EcrCollJournalForWriteEcrSimple';
import {
  DtoTGZ001OutDC10CompteForList as DtoDC10
} from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';
import {
  TGC003SaisieEcrituresService as ServiceTGC003
} from 'src/app/_services/TGC003SaisieEcrituresService';
import {
  TGZ001AffichageService as ServiceTGZ001
} from 'src/app/_services/TGZ001AffichageService';
import {
  compteValidator
} from 'src/app/_validator/function/compteValide.validator';
import {
  montantValidator
} from 'src/app/_validator/function/montantValide.validator';

import {AppSettings} from '../../../../app.settings';
import {Settings} from '../../../../app.settings.model';
import {DialogPeriodeComptaDialog} from '../../dialog/dialog-periode-compta';

@Component({
  selector : 'app-saisie-ecritures-simple',
  templateUrl : './simple.component.html',
  styleUrls : [ './simple.component.scss' ]
})
export class SimpleComponent implements OnInit {
  private settings: Settings;
  private form: FormGroup;
  private swTouch = false;

  private planComptable: DtoDC10[];
  private planComptableString: string[];
  private planComptable6String: string[];

  // DA21Config
  private dA21Config: DtoTGA002OutDA21ConfigForSelect;

  // Resolver
  private RESOLVER_DATA_CONFIG = 'config';
  private RESOLVER_DATA_PLAN_COMPTABLE = 'planComptable';

  /**
   * Constructor
   * @param appSettings Settings
   * @param route Injection activated route
   * @param fb Injection form builder
   * @param snackBar Injection Mat snack bar
   * @param router Injection router
   * @param serviceTGZ001 Injection TGZ001AffichageService service
   * @param serviceTGC003 Injection TGC003SaisieEcrituresService service
   * @param dialog Injection Mat dialog
   * @returns void
   */
  public constructor(private appSettings: AppSettings,
                     private route: ActivatedRoute, private fb: FormBuilder,
                     private snackBar: MatSnackBar, private router: Router,
                     private serviceTGZ001: ServiceTGZ001,
                     private serviceTGC003: ServiceTGC003,
                     private dialog: MatDialog) {
    this.settings = this.appSettings.settings;
  }

  /**
   * On init
   * Chargement de la période comptable DA21Config
   * Puis chargement du plan comptable et préparation du formulaire réactif
   * @returns void
   */
  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dA21Config = data[this.RESOLVER_DATA_CONFIG];
      if (this.dA21Config === undefined || this.dA21Config === null) {
        this.openDialog();
      }
      this.planComptable = data[this.RESOLVER_DATA_PLAN_COMPTABLE];
      this.planComptableString =
          this.serviceTGZ001.computeArrayStringPlanComptable(
              this.planComptable);
      this.planComptable6String =
          this.serviceTGZ001.computeArrayString6PlanComptable(
              this.planComptable);
      // Je set la form après le retour du service
      this.form = this.fb.group({
        dateEcriture : this.fb.group({
          dateEcriture : [ null, Validators.compose([ Validators.required ]) ],
        }),
        montant : this.fb.group({
          montant : [
            null,
            Validators.compose([ Validators.required, montantValidator() ])
          ]
        }),
        piece : this.fb.group({
          noPiece : [ null ],
          datePiece : [ null ],
        }),
        compteDebit : this.fb.group({
          noCompteDebit : [
            null, Validators.compose([
              Validators.required, Validators.minLength(6),
              compteValidator(this.planComptable6String)
            ])
          ],
          compteDebit : [ {value : '', disabled : true} ],
        }),
        libelleDebit :
            this.fb.group({libelle1Debit : [ null ], libelle2Debit : [ null ]}),
        compteCredit : this.fb.group({
          noCompteCredit : [
            null, Validators.compose([
              Validators.required, Validators.minLength(6),
              compteValidator(this.planComptable6String)
            ])
          ],
          compteCredit : [ {value : '', disabled : true} ],
        }),
        libelleCredit : this.fb.group(
            {libelle1Credit : [ null ], libelle2Credit : [ null ]}),
      },
                                {
                                  validator : this.compteIdentitiqueValidator()
                                });
    });
  }

  /**
   * Dialog pour configuer les dates de la période comptable du bilan
   * @param null aucune param
   * @returns void
   */
  private openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (this.dA21Config === undefined || this.dA21Config === null) {
      const year: number = new Date().getFullYear();
      dialogConfig.data = {
        periodeComptaDateDebut : new Date(year, 1 - 1, 1), // range month = 0-11
        periodeComptaDateFin : new Date(year, 12 - 1, 31), // range month = 0-11
      };
    } else {
      // technically not possible, is null or is valid, in backend logic
      dialogConfig.data = {
        periodeComptaDateDebut : this.dA21Config.periodeComptaDateDebut,
        periodeComptaDateFin : this.dA21Config.periodeComptaDateFin
      };
    }
    const dialogRef = this.dialog.open(DialogPeriodeComptaDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        this.router.navigate([ '/index' ]);
        this.snackBar.open(
            'Dates de période obligatoires', 'Configuration comptabilité',
            {duration : 7000, panelClass : [ 'warning-snackbar' ]});
      }
    });
  }

  /**
   * Validateur entre le n° de compte débit et crédit
   * @return any Validateur
   */
  private compteIdentitiqueValidator(): any {
    const ERR_COMPTE_IDENTIQUE = 'compteIdentique';
    return (group: FormGroup) => {
      const noDebit = group.controls.compteDebit.get('noCompteDebit');
      const noCredit = group.controls.compteCredit.get('noCompteCredit');
      if (noDebit.value === noCredit.value) {
        if (+noCredit.value > 0) {
          return group.controls.compteCredit.get('noCompteCredit').setErrors({
            compteIdentique : true
          });
        }
      }
      const err = group.controls.compteCredit.get('noCompteCredit').errors;
      if (err) {
        delete err[ERR_COMPTE_IDENTIQUE]; // delete your own error
        if (!Object.keys(err).length) {   // if no errors left
          return group.controls.compteCredit.get('noCompteCredit')
              .setErrors(null); // set control errors to null making it VALID
        } else {
          return group.controls.compteCredit.get('noCompteCredit')
              .setErrors(err); // controls got other errors so set them back
        }
      }
    };
  }

  /**
   * Reprise de la valeur entre le libellé débit et crédit
   * @param event table de string de 2 occurs
   * @return void
   */
  private libelleDebitBlur(event: string[]): void {
    if (event[0] !== '' &&
        !this.form.controls.libelleCredit.get('libelle1Credit').touched) {
      this.form.controls.libelleCredit.get('libelle1Credit').setValue(event[0]);
    }
    if (event[1] !== '' &&
        !this.form.controls.libelleCredit.get('libelle2Credit').touched) {
      this.form.controls.libelleCredit.get('libelle2Credit').setValue(event[1]);
    }
  }

  /**
   * Reprise de la valeur entre le libellé crédit et débit
   * @param event table de string de 2 occurs
   * @return void
   */
  private libelleCreditBlur(event: string[]): void {
    if (event[0] !== '' &&
        !this.form.controls.libelleDebit.get('libelle1Debit').touched) {
      this.form.controls.libelleDebit.get('libelle1Debit').setValue(event[0]);
    }
    if (event[1] !== '' &&
        !this.form.controls.libelleDebit.get('libelle2Debit').touched) {
      this.form.controls.libelleDebit.get('libelle2Debit').setValue(event[1]);
    }
  }

  /**
   * Envoi du formulaire
   * @return void
   */
  private onSubmit(): void {
    // touch les fb à l'interieur de fb
    this.swTouch = true;
    if (this.form.valid && this.form.controls.dateEcriture.valid &&
        this.form.controls.montant.valid && this.form.controls.piece.valid &&
        this.form.controls.compteDebit.valid &&
        this.form.controls.libelleDebit.valid &&
        this.form.controls.compteCredit.valid &&
        this.form.controls.libelleCredit.valid) {
      const dto: DtoDC31 = {
        noCompteDebit :
            +this.form.controls.compteDebit.get('noCompteDebit').value,
        noCompteCredit :
            +this.form.controls.compteCredit.get('noCompteCredit').value,
        dateEcriture :
            new Date(this.form.controls.dateEcriture.get('dateEcriture').value),
        noPiece : +this.form.controls.piece.get('noPiece').value,
        // tslint:disable-next-line: max-line-length
        datePiece :
            this.form.controls.piece.get('datePiece').value == null ||
                    this.form.controls.piece.get('datePiece').value === ''
                ? null
                : new Date(this.form.controls.piece.get('datePiece').value),
        montant : +(
            this.form.controls.montant.get('montant').value.toString().replace(
                /[^\d.-]/g, '')),
        libelle1Debit :
            this.form.controls.libelleDebit.get('libelle1Debit').value == null
                ? ''
                : this.form.controls.libelleDebit.get('libelle1Debit').value,
        libelle2Debit :
            this.form.controls.libelleDebit.get('libelle2Debit').value == null
                ? ''
                : this.form.controls.libelleDebit.get('libelle2Debit').value,
        libelle1Credit :
            this.form.controls.libelleCredit.get('libelle1Credit').value == null
                ? ''
                : this.form.controls.libelleCredit.get('libelle1Credit').value,
        libelle2Credit :
            this.form.controls.libelleCredit.get('libelle2Credit').value == null
                ? ''
                : this.form.controls.libelleCredit.get('libelle2Credit').value,
      };
      this.serviceTGC003.nouvelleEcritureSimple(dto).subscribe(
          next => {
            this.snackBar.open(
                'Écriture crée (à journaliser)', 'Message',
                {duration : 2000, panelClass : [ 'success-snackbar' ]});
            this.router.navigate([ '/index/comptabilite/saisie-ecritures' ]);
          },
          error => {
            console.log(error);
            this.snackBar.open(
                'Erreur pendant l\'envoi de l\'écriture', 'Erreur Http',
                {duration : 7000, panelClass : [ 'error-snackbar' ]});
          });
    }
  }
}
