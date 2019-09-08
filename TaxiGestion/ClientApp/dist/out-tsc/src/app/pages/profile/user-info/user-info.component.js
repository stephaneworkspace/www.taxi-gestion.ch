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
import { FormBuilder, Validators } from '@angular/forms';
let UserInfoComponent = class UserInfoComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.salutations = [
            { id: 1, name: 'Mr' },
            { id: 2, name: 'Mrs' }
        ];
        this.genders = [
            { id: 1, name: 'Male' },
            { id: 2, name: 'Female' }
        ];
        this.countries = [
            { id: 1, name: 'USA' },
            { id: 2, name: 'Canada' },
            { id: 3, name: 'Mexico' },
            { id: 4, name: 'UK' },
            { id: 5, name: 'France' },
            { id: 6, name: 'Italy' }
        ];
        this.states = [
            { id: 1, name: 'Arkansas' },
            { id: 2, name: 'Texas' },
            { id: 3, name: 'California' },
            { id: 4, name: 'Florida' },
            { id: 5, name: 'Other' }
        ];
    }
    ngOnInit() {
        this.personalForm = this.formBuilder.group({
            'salutation': [''],
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'gender': [''],
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'phone': ['', Validators.required],
            'zipcode': ['', Validators.required],
            'country': ['', Validators.required],
            'state': [''],
            'address': ['']
        });
    }
    onSubmit(values) {
        if (this.personalForm.valid) {
            // this.router.navigate(['pages/dashboard']);
        }
    }
};
UserInfoComponent = __decorate([
    Component({
        selector: 'app-user-info',
        templateUrl: './user-info.component.html',
        styleUrls: ['./user-info.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder])
], UserInfoComponent);
export { UserInfoComponent };
export function emailValidator(control) {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
//# sourceMappingURL=user-info.component.js.map