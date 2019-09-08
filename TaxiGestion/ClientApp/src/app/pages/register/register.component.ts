import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TGA001AuthentificationService as Service } from 'src/app/_services/TGA001AuthentificationService';
import { MatSnackBar } from '@angular/material';
import { NomUtilisateurDisponibleValidator } from 'src/app/_validator/TGA/nomUtilisateurDisponible.validator';
import { EmailDisponibleValidator } from 'src/app/_validator/TGA/emailDisponible.validator';
import { npaCompletData } from 'src/app/_data/TGA/npa.data'
import { NpaValidator } from 'src/app/_validator/TGA/npa.validator';
import { DtoTGA001InpDA01UtilisateurPourInscription } from 'src/app/_dto/TGA/DtoTGA001InpDA01UtilisateurPourInscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public settings: Settings;
  filteredOptions: Observable<string[]>;
  matErrorNomUtilisateurDisponible = "";
  matErrorEmailDisponible = "";
  matErrorNpaGeneve = "";
  swDisabled = false;

  constructor(
      public appSettings:AppSettings, 
      public fb: FormBuilder, 
      public router:Router,
      private service: Service,
      private snackBar: MatSnackBar,
      private nomUtilisateurDisponibleValidator: NomUtilisateurDisponibleValidator,
      private emailDisponibleValidator: EmailDisponibleValidator,
      private npaValidator: NpaValidator){
    this.settings = this.appSettings.settings; 
    this.firstFormGroup  = this.fb.group({
      'nomUtilisateur': [null, Validators.compose([Validators.required, Validators.minLength(2)]), [this.nomUtilisateurDisponibleValidator.validateNomUtilisateur]],
      'email': [null, Validators.compose([Validators.required, emailValidator]), [this.emailDisponibleValidator.validateEmail]],
      'motDePasse': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmMotDePasse': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    },{validator: matchingPasswords('motDePasse', 'confirmMotDePasse')});
    this.secondFormGroup = this.fb.group({
      'nomDeFamille': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'prenom': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'adresse': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'npa': [null, Validators.compose([Validators.required, Validators.minLength(4)]), [this.npaValidator.validateNpa]],
    });
  }

  ngOnInit() {
    this.filteredOptions = this.secondFormGroup.get('npa').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
    this.messageErreurNomUtilisateurDisponible();
    this.messageErreurEmailDisponible();
    this.messageErreurNpaGeneve();
  }

  filter(val): string[] {
    return npaCompletData.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  messageErreurNomUtilisateurDisponible() {
    this.firstFormGroup.get('nomUtilisateur').valueChanges.subscribe(val => {
      this.matErrorNomUtilisateurDisponible = "Le nom d'utilisateur « " + val + " » est déjà utilisé";
    });
  }

  messageErreurEmailDisponible() {
    this.firstFormGroup.get('email').valueChanges.subscribe(val => {
      this.matErrorEmailDisponible = "L'e-mail « " + val + " » est déjà utilisé";
    });
  }

  messageErreurNpaGeneve() {
    this.secondFormGroup.get('npa').valueChanges.subscribe(val => {
      this.matErrorNpaGeneve = "Le npa « " + val.slice(0, 4) + " » ne fait pas partie du canton de Genève";
    })
  }

  public onSubmit(values:Object):void {
    if (this.firstFormGroup.valid) {
      this.router.navigate(['/login']);
    }
  }

    btnClickInscription(): void {
      if (this.swDisabled == false && this.firstFormGroup.valid && this.secondFormGroup.valid) {
          this.swDisabled = true;
          let model = {
            nomUtilisateur: this.firstFormGroup.controls.nomUtilisateur.value,
            email: this.firstFormGroup.controls.email.value,
            motDePasse: this.firstFormGroup.controls.motDePasse.value,
            nomDeFamille: this.secondFormGroup.controls.nomDeFamille.value,
            prenom: this.secondFormGroup.controls.prenom.value,
            adresse: this.secondFormGroup.controls.adresse.value,
            codePostal: this.secondFormGroup.controls.npa.value.slice(0, 4),
            lieu: (this.secondFormGroup.controls.npa.value.slice(4,1) == null || this.secondFormGroup.controls.npa.value.slice(4,1) == " " ? this.secondFormGroup.controls.npa.value.slice(5) : this.secondFormGroup.controls.npa.value.slice(4))
          } as DtoTGA001InpDA01UtilisateurPourInscription;
          this.service.inscription(model).subscribe(next => {
            this.snackBar.open('Vous allez recevoir un e-mail', 'Inscription', {
              duration: 7000,
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/']);
          }, error => {
            console.log(error);
            this.snackBar.open('Erreur lors de l\'inscription', 'Erreur Http', {
              duration: 7000,
              panelClass: ['error-snackbar']
            });
            this.swDisabled = false;
          });
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }
}