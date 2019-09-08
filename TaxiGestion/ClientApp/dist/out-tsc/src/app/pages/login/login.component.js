var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { TGA001AuthentificationService } from 'src/app/_services/TGA001AuthentificationService';
import { MatSnackBar } from '@angular/material';
let LoginComponent = class LoginComponent {
    constructor(appSettings, fb, router, authService, snackBar) {
        this.appSettings = appSettings;
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.snackBar = snackBar;
        this.model = {};
        localStorage.removeItem('token');
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'nomUtilisateur': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            'motDePasse': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }
    onSubmit(values) {
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
                this.snackBar.open('Erreur lors du login', 'Erreur Http', {
                    duration: 7000,
                    panelClass: ['error-snackbar']
                });
                //this.router.navigate(['/members']);
            });
            //this.router.navigate(['/index']);
        }
    }
    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings,
        FormBuilder,
        Router,
        TGA001AuthentificationService,
        MatSnackBar])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map