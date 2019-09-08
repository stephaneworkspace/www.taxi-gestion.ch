import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DtoTGZ001OutDC10CompteForList as DtoDC10 } from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';
import { TGZ001AffichageService as Service } from 'src/app/_services/TGZ001AffichageService';
import { CompteValideValidator, compteValidator } from 'src/app/_validator/TGZ/compteValide.validator';

@Component({
  selector: 'app-saisie-ecritures-simple',
  templateUrl: './simple.component.html',
  // styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {  
  public settings: Settings;
  public form: FormGroup;
  filteredOptions: Observable<string[]>;

  public planComptable: DtoDC10[];
  public planComptableString: string[];
  public planComptable6String: string[];

  public matErrorNoCompteDebit: string;
  
  constructor(
        public appSettings:AppSettings,
        private route: ActivatedRoute,
        public fb: FormBuilder,
        private service: Service) {
        //private compteValidator: CompteValideValidator) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.planComptable = data['planComptable'];
        this.planComptableString = this.service.computeArrayStringPlanComptable(this.planComptable);
        this.planComptable6String = this.service.computeArrayString6PlanComptable(this.planComptable);
        // Je set la form après le retour du service
        this.form  = this.fb.group({
            'noCompteDebit': [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])]
        });
        this.filteredOptions = this.form.get('noCompteDebit').valueChanges
        .pipe(
            startWith(''),
            map(val => this.filter(val))
        );
      });
    this.onChangeNoCompteDebit();/*
    this.messageErreurNomUtilisateurDisponible();
    this.messageErreurEmailDisponible();
    this.messageErreurNpaGeneve();*/
  }

  onChangeNoCompteDebit() {
    this.form.get('noCompteDebit').valueChanges.subscribe(val => {
      // Sécurité à 6 charactères
      if (val.length > 6) {
          this.form.get('noCompteDebit').setValue(val.slice(0, 6));
      }
      this.matErrorNoCompteDebit = "Le n° de cpte. « " + val + " » n'existe pas"
    });
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
}
