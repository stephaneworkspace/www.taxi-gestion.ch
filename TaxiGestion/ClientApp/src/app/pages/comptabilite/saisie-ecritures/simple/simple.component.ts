import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { compteValidator } from 'src/app/_validator/function/compteValide.validator';
import { montantValidator } from 'src/app/_validator/function/montantValide.validator';
import { TGC003SaisieEcrituresService as ServiceTGC003 } from 'src/app/_services/TGC003SaisieEcrituresService';
import { TGZ001AffichageService as ServiceTGZ001 } from 'src/app/_services/TGZ001AffichageService';
import { DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple as DtoDC31 } from 'src/app/_dto/TGC/DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple';
import { DtoTGZ001OutDC10CompteForList as DtoDC10 } from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-saisie-ecritures-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {
  public settings: Settings;
  public form: FormGroup;
  public swTouch = false;

  public planComptable: DtoDC10[];
  public planComptableString: string[];
  public planComptable6String: string[];

  constructor(
        public appSettings: AppSettings,
        private route: ActivatedRoute,
        public fb: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router,
        private serviceTGZ001: ServiceTGZ001,
        private serviceTGC003: ServiceTGC003) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.planComptable = data['planComptable'];
      this.planComptableString = this.serviceTGZ001.computeArrayStringPlanComptable(this.planComptable);
      this.planComptable6String = this.serviceTGZ001.computeArrayString6PlanComptable(this.planComptable);
      // Je set la form après le retour du service
      this.form  = this.fb.group({
        'dateEcriture': this.fb.group({
          'dateEcriture': [null, Validators.compose([Validators.required])],
        }),
        'montant': this.fb.group({
          montant: [null, Validators.compose([Validators.required, montantValidator()])]
        }),
        'piece': this.fb.group({
          'noPiece': [null],
          'datePiece': [null],
        }),
        'compteDebit': this.fb.group({
          noCompteDebit: [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])],
          compteDebit: [{value: '', disabled: true}],
        }),
        'libelleDebit': this.fb.group({
          'libelle1Debit': [null],
          'libelle2Debit': [null]
        }),
        'compteCredit': this.fb.group({
          noCompteCredit: [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])],
          compteCredit: [{value: '', disabled: true}],
        }),
        'libelleCredit': this.fb.group({
          'libelle1Credit': [null],
          'libelle2Credit': [null]
        }),
      }, {validator: this.compteIdentitiqueValidator()
      });
    });
  }
   
  /**
   * Validateur entre le n° de compte débit et crédit
   * https://stackoverflow.com/questions/43445315/angular2-reactive-forms-delete-error/51820420#51820420
   */
  compteIdentitiqueValidator() {
    return (group: FormGroup) => {
      let noDebit = group.controls.compteDebit.get('noCompteDebit');
      let noCredit = group.controls.compteCredit.get('noCompteCredit');
      if (noDebit.value === noCredit.value) {
        if (+noCredit.value > 0) {
          return group.controls.compteCredit.get('noCompteCredit').setErrors({compteIdentique: true});
        }
      }
      const err = group.controls.compteCredit.get('noCompteCredit').errors;
      if (err) {
        delete err['compteIdentique']; // delete your own error
        if (!Object.keys(err).length) { // if no errors left
          return group.controls.compteCredit.get('noCompteCredit').setErrors(null); // set control errors to null making it VALID
        } else {
          return group.controls.compteCredit.get('noCompteCredit').setErrors(err); // controls got other errors so set them back
        }
      }
    }
  }

  /**
   * Reprise de la valeur entre le libellé débit et crédit
   * @param event table de string de 2 occurs
   */
  libelleDebitBlur(event: string[]): void {
    if (event[0] != '' && !this.form.controls.libelleCredit.get('libelle1Credit').touched)
      this.form.controls.libelleCredit.get('libelle1Credit').setValue(event[0])
    if (event[1] != '' && !this.form.controls.libelleCredit.get('libelle2Credit').touched)
      this.form.controls.libelleCredit.get('libelle2Credit').setValue(event[1])
  }

    /**
   * Reprise de la valeur entre le libellé crédit et débit
   * @param event table de string de 2 occurs
   */
  libelleCreditBlur(event: string[]): void {
    if (event[0] != '' && !this.form.controls.libelleDebit.get('libelle1Debit').touched)
      this.form.controls.libelleDebit.get('libelle1Debit').setValue(event[0])
    if (event[1] != '' && !this.form.controls.libelleDebit.get('libelle2Debit').touched)
      this.form.controls.libelleDebit.get('libelle2Debit').setValue(event[1])
  }

  /**
   * Envoi du formulaire
   */
  onSubmit() {
    // touch les fb à l'interieur de fb
    this.swTouch = true;
    if (this.form.valid 
      && this.form.controls.dateEcriture.valid
      && this.form.controls.montant.valid
      && this.form.controls.piece.valid
      && this.form.controls.compteDebit.valid 
      && this.form.controls.libelleDebit.valid
      && this.form.controls.compteCredit.valid
      && this.form.controls.libelleCredit.valid) {
      let dto: DtoDC31 = {
        noCompteDebit: +this.form.controls.compteDebit.get('noCompteDebit').value,
        noCompteCredit: +this.form.controls.compteCredit.get('noCompteCredit').value,
        dateEcriture: new Date(this.form.controls.dateEcriture.get('dateEcriture').value),
        noPiece: +this.form.controls.piece.get('noPiece').value,
        datePiece: this.form.controls.piece.get('datePiece').value == null || this.form.controls.piece.get('datePiece').value == '' ? null : new Date(this.form.controls.piece.get('datePiece').value),
        montant: +(this.form.controls.montant.get('montant').value.toString().replace(/[^\d.-]/g, '')),
        libelle1Debit: this.form.controls.libelleDebit.get('libelle1Debit').value == null ? '' : this.form.controls.libelleDebit.get('libelle1Debit').value,
        libelle2Debit: this.form.controls.libelleDebit.get('libelle2Debit').value == null ? '' : this.form.controls.libelleDebit.get('libelle2Debit').value,
        libelle1Credit: this.form.controls.libelleCredit.get('libelle1Credit').value == null ? '' : this.form.controls.libelleCredit.get('libelle1Credit').value,
        libelle2Credit: this.form.controls.libelleCredit.get('libelle2Credit').value == null ? '' : this.form.controls.libelleCredit.get('libelle2Credit').value,
      };
      this.serviceTGC003.nouvelleEcritureSimple(dto).subscribe(next => {
        this.snackBar.open('Écriture crée (à journaliser)', 'Message', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/index/comptabilite/saisie-ecritures']);
      }, error => {
        console.log(error);
        this.snackBar.open('Erreur pendant l\'envoi de l\'écriture', 'Erreur Http', {
          duration: 7000,
          panelClass: ['error-snackbar']
        });
      });
    }
  }
}
