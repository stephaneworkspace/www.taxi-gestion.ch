import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { compteValidator } from 'src/app/_validator/function/compteValide.validator';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_helper/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CurrencyPipe, DecimalPipe  } from '@angular/common';
import { montantValidator } from 'src/app/_validator/function/montantValide.validator';
import { TGC003SaisieEcrituresService as ServiceTGC003 } from 'src/app/_services/TGC003SaisieEcrituresService';
import { TGZ001AffichageService as ServiceTGZ001 } from 'src/app/_services/TGZ001AffichageService';
import { DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple as DtoDC31 } from 'src/app/_dto/TGC/DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple';
import { DtoTGZ001OutDC10CompteForList as DtoDC10 } from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-saisie-ecritures-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    CurrencyPipe,
  ]
})
export class SimpleComponent {  
  public settings: Settings;
  public form: FormGroup;
  
  public planComptable: DtoDC10[];
  public planComptableString: string[];
  public planComptable6String: string[];

  public filteredOptionsDebit: Observable<string[]>;
  public placeholderNoCompteDebit: string = "N°";
  public placeholderCompteDebit: string = "Compte";
  public matErrorNoCompteDebit: string;
  public filteredOptionsCredit: Observable<string[]>;
  public placeholderNoCompteCredit: string = "N°";
  public placeholderCompteCredit: string = "Compte";
  public matErrorNoCompteCredit: string;
  
  constructor(
        public appSettings:AppSettings,
        private route: ActivatedRoute,
        public fb: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router,
        private serviceTGZ001: ServiceTGZ001,
        private serviceTGC003: ServiceTGC003,
        private currencyPipe: CurrencyPipe ) {
        //private compteValidator: CompteValideValidator) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.planComptable = data['planComptable'];
        this.planComptableString = this.serviceTGZ001.computeArrayStringPlanComptable(this.planComptable);
        this.planComptable6String = this.serviceTGZ001.computeArrayString6PlanComptable(this.planComptable);
        // Je set la form après le retour du service
        this.form  = this.fb.group({
            'dateEcriture': [null, Validators.compose([Validators.required])],
            'montant': [null, Validators.compose([Validators.required, montantValidator()])],
            'noPiece': [null],
            'datePiece': [null],
            'noCompteDebit': [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])],
            'compteDebit': [{value: '', disabled: true}],
            'libelle1Debit' : [null],
            'libelle2Debit' : [null],
            'noCompteCredit': [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])],
            'compteCredit': [{value: '', disabled: true}],
            'libelle1Credit' : [null],
            'libelle2Credit' : [null],
            
        });
        this.filteredOptionsDebit = this.form.get('noCompteDebit').valueChanges
        .pipe(
            startWith(''),
            map(val => this.filter(val))
        );
        this.filteredOptionsCredit = this.form.get('noCompteCredit').valueChanges
        .pipe(
            startWith(''),
            map(val => this.filter(val))
        );
      });
    this.onChangeNoCompteDebit();
    this.onChangeNoCompteCredit();
  }

  /**
   * Au moment d'un changement dans le n° de compte - débit
   */
  onChangeNoCompteDebit() {
    this.form.get('noCompteDebit').valueChanges.subscribe(val => {
      // Sécurité à 6 charactères
      let swOk = false;
      if (val.length > 6) {
          this.form.get('noCompteDebit').setValue(val.slice(0, 6));
          swOk = true;
      }
      // Texte d'erreur si le validator en décide ainsi
      this.matErrorNoCompteDebit = "« " + val + " » faux";
      // Trouver le compte et changer le placeholder
      if (val.length == 6 || swOk) {
        let swChange = false;
        this.planComptable.forEach(element => {
          if (element.noCompte.toString() == val.slice(0, 6)) {
            swChange = true;
            this.placeholderNoCompteDebit = "N° compte";
            this.placeholderCompteDebit = "Désignation";
            this.form.get('compteDebit').setValue(element.texte);
          }
        });
        if (swChange == false) {
          this.placeholderNoCompteDebit = "N°";
          this.placeholderCompteDebit = "Compte";
          this.form.get('compteDebit').setValue('');
        }
      } else {
        this.placeholderNoCompteDebit = "N°";
        this.placeholderCompteDebit = "Compte";
        this.form.get('compteDebit').setValue('');
      }
    });
  }

  /**
   * Au moment d'un changement dans le n° de compte - crédit
   */
  onChangeNoCompteCredit() {
    this.form.get('noCompteCredit').valueChanges.subscribe(val => {
      // Sécurité à 6 charactères
      let swOk = false;
      if (val.length > 6) {
          this.form.get('noCompteCredit').setValue(val.slice(0, 6));
          swOk = true;
      }
      // Texte d'erreur si le validator en décide ainsi
      this.matErrorNoCompteCredit = "« " + val + " » faux";
      // Trouver le compte et changer le placeholder
      if (val.length == 6 || swOk) {
        let swChange = false;
        this.planComptable.forEach(element => {
          if (element.noCompte.toString() == val.slice(0, 6)) {
            swChange = true;
            this.placeholderNoCompteCredit = "N° compte";
            this.placeholderCompteCredit = "Désignation";
            this.form.get('compteCredit').setValue(element.texte);
          }
        });
        if (swChange == false) {
          this.placeholderNoCompteCredit = "N°";
          this.placeholderCompteCredit = "Compte";
          this.form.get('compteCredit').setValue('');
        }
      } else {
        this.placeholderNoCompteCredit = "N°";
        this.placeholderCompteCredit = "Compte";
        this.form.get('compteCredit').setValue('');
      }
    });
  }

  blurMontant() {
    let base = this.form.controls.montant.value.toString().replace(/[^\d.-]/g, '');
    let re = /,/gi; 
    let str = this.currencyPipe.transform(base, 'CHF', '', '1.2-2');
    let newStr = str.replace(re, '\''); 
    this.form.get('montant').setValue(newStr);
  }

  blueNoPiece() {
    let re = /[^0-9]/g;
    let str = this.form.controls.noPiece.value;
    if (str == null)
      str = '';
    let newStr = str.toString().replace(re, '');
    this.form.get('noPiece').setValue(newStr);
  }

  blurLibelle1Debit() {
    if (!this.form.controls.libelle1Credit.touched)
      this.form.get('libelle1Credit').setValue(this.form.controls.libelle1Debit.value)
  }

  blurLibelle2Debit() {
    if (!this.form.controls.libelle2Credit.touched)
      this.form.get('libelle2Credit').setValue(this.form.controls.libelle2Debit.value)
  }

  blurLibelle1Credit() {
    if (!this.form.controls.libelle1Debit.touched)
      this.form.get('libelle1Debit').setValue(this.form.controls.libelle1Credit.value)
  }

  blurLibelle2Credit() {
    if (!this.form.controls.libelle2Debit.touched)
      this.form.get('libelle2Debit').setValue(this.form.controls.libelle2Credit.value)
  }


  filter(val): string[] {
    return this.planComptableString.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  //Datepicker start date
  startDate = new Date(1990, 0, 1);

  //Datepicker with min & max validation
  minDate = new Date(2010, 0, 1);
  maxDate = new Date(2020, 0, 1);

  //Datepicker with filter validation
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  //Datepicker input and change events
  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  selectionPlanComptableDebit() {
      alert('à faire');
  }

  onSubmit() {
    if (this.form.valid) {
      let dto: DtoDC31 = {
        noCompteDebit: +this.form.controls.noCompteDebit.value,
        noCompteCredit: +this.form.controls.noCompteCredit.value,
        dateEcriture: new Date(this.form.controls.dateEcriture.value),
        noPiece: +this.form.controls.noPiece.value,
        datePiece: this.form.controls.datePiece.value == null || this.form.controls.datePiece.value == '' ? null : new Date(this.form.controls.datePiece.value),
        montant: +(this.form.controls.montant.value.toString().replace(/[^\d.-]/g, '')),
        libelle1Debit: this.form.controls.libelle1Debit.value,
        libelle2Debit: this.form.controls.libelle2Debit.value,
        libelle1Credit: this.form.controls.libelle1Credit.value,
        libelle2Credit: this.form.controls.libelle2Credit.value,
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
