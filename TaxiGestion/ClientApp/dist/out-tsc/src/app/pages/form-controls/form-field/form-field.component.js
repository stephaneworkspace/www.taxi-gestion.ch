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
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppSettings } from '../../../app.settings';
let FormFieldComponent = class FormFieldComponent {
    constructor(appSettings, formBuilder) {
        this.appSettings = appSettings;
        this.formBuilder = formBuilder;
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.hide = true;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.options = this.formBuilder.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
        this.themingForm = this.formBuilder.group({
            'color': 'primary',
            'fontSize': [16, Validators.min(10)],
        });
    }
    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    getFontSize() {
        return Math.max(10, this.themingForm.value.fontSize);
    }
};
FormFieldComponent = __decorate([
    Component({
        selector: 'app-form-field',
        templateUrl: './form-field.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings, FormBuilder])
], FormFieldComponent);
export { FormFieldComponent };
//# sourceMappingURL=form-field.component.js.map