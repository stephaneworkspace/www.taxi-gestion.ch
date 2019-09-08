import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { TGA001AuthentificationService } from 'src/app/_services/TGA001AuthentificationService';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model: any = {};
  public form: FormGroup;
  public settings: Settings;
  constructor(
      public appSettings: AppSettings, 
      public fb: FormBuilder, 
      public router: Router,
      public authService: TGA001AuthentificationService,
      public snackBar: MatSnackBar
    ){
    localStorage.removeItem('token');
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'nomUtilisateur': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'motDePasse': [null, Validators.compose([Validators.required, Validators.minLength(6)])] 
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      // peut être que ce bout de code est inutile avec model: any = {};
      this.model = {
        nomUtilisateur: this.form.controls.nomUtilisateur.value,
        motDePasse: this.form.controls.motDePasse.value
      };
      this.authService.login(this.model).subscribe(next => {
        this.snackBar.open('Login avec succès', 'Message', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/index']);
      }, error => {
        console.log(error);
        this.snackBar.open('Erreur lors du login', 'Erreur Http', {
          duration: 7000,
          panelClass: ['error-snackbar']
        });
        //this.router.navigate(['/members']);
      });
      //this.router.navigate(['/index']);
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
    }
}