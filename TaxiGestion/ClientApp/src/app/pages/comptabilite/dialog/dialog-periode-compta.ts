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
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatFormFieldControl,
  MatSnackBar
} from '@angular/material';
import {Router} from '@angular/router';
import {
  DtoTGA002InpDA21ConfigForWrite as DtoDA21
} from 'src/app/_dto/TGA/DtoTGA002InpDA21ConfigForWrite';
import {TGA002ConfigService} from 'src/app/_services/TGA002ConfigService';

@Component({
  selector : 'app-dialog-period-compta',
  templateUrl : 'dialog-periode-compta.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogPeriodeComptaDialog implements OnInit, AfterContentChecked {

  public dataFromDb: DtoDA21;
  public form: FormGroup;
  public swTouch = false;
  public swLoaded = false;

  /**
   * Constructor
   * @param dialogRef MatDialogRef de type DialogPeriodeComptaDialog
   * @param fb Injection form builder reactif
   * @param router Injection router
   * @param serviceTGA002 Injection TGA002ConfigService service
   * @param snackBar Injection Mat snack bar
   * @param cdref Injection ChangeDetectorRef, voir methode
   *     this.ngAfterContentChecked()
   * @returns void
   */
  constructor(public dialogRef: MatDialogRef<DialogPeriodeComptaDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder,
              private router: Router,
              private serviceTGA002: TGA002ConfigService,
              private snackBar: MatSnackBar, private cdref: ChangeDetectorRef) {
    this.dataFromDb = {
      periodeComptaDateDebut : data.periodeComptaDateDebut,
      periodeComptaDateFin : data.periodeComptaDateFin
    };
  }

  /**
   * Supprimer une erreur dans la console du navigateur
   * en relation avec le formulaire en ralation avecpatchValue de ngOnInit
   * @return void
   */
  ngAfterContentChecked(): void { this.cdref.detectChanges(); }

  /**
   * On init
   * Chargement du form group réactif
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      // tslint:disable-next-line: object-literal-key-quotes
      'dateExerciceCompta' : this.fb.group({
        // tslint:disable-next-line: object-literal-key-quotes
        'dateExerciceComptaDebut' :
            [ null, Validators.compose([ Validators.required ]) ],
        // tslint:disable-next-line: object-literal-key-quotes
        'dateExerciceComptaFin' :
            [ null, Validators.compose([ Validators.required ]) ],
      }),
    });
    this.form.patchValue({
      dateExerciceCompta : {
        dateExerciceComptaDebut : this.dataFromDb.periodeComptaDateDebut,
        dateExerciceComptaFin : this.dataFromDb.periodeComptaDateFin
      }
    });
    this.swLoaded = true;
  }

  /**
   * Fermeture du popup avec comme retour à close() -> close(null)
   * @retunr void
   */
  onNoClick(): void { this.dialogRef.close(null); }

  /**
   * Traitement du formulaire
   */
  onSubmit() {
    this.swTouch = true;
    // Envoi du formulaire
    if (this.form.valid && this.form.controls.dateExerciceCompta.valid) {
      const dto: DtoDA21 = {
        periodeComptaDateDebut :
            this.form.controls.dateExerciceCompta.get('dateExerciceComptaDebut')
                .value,
        periodeComptaDateFin :
            this.form.controls.dateExerciceCompta.get('dateExerciceComptaFin')
                .value,
      };
      this.serviceTGA002.postConfig(dto).subscribe(
          next => {
            this.snackBar.open(
                'La comptabilité est prête à être utilisée', 'Message',
                {duration : 2000, panelClass : [ 'success-snackbar' ]});
            this.dialogRef.close(dto);
          },
          error => {
            console.log(error);
            this.snackBar.open(
                'Erreur pendant l\'envoi de la configuration de la comptabilité',
                'Erreur Http',
                {duration : 7000, panelClass : [ 'error-snackbar' ]});
            this.router.navigate([ '/index' ]);
          });
    }
  }
}
