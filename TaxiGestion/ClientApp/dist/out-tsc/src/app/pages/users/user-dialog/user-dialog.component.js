var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from '../user.model';
let UserDialogComponent = class UserDialogComponent {
    constructor(dialogRef, user, fb) {
        this.dialogRef = dialogRef;
        this.user = user;
        this.fb = fb;
        this.passwordHide = true;
        this.form = this.fb.group({
            id: null,
            username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            profile: this.fb.group({
                name: null,
                surname: null,
                birthday: null,
                gender: null,
                image: null
            }),
            work: this.fb.group({
                company: null,
                position: null,
                salary: null
            }),
            contacts: this.fb.group({
                email: null,
                phone: null,
                address: null
            }),
            social: this.fb.group({
                facebook: null,
                twitter: null,
                google: null
            }),
            settings: this.fb.group({
                isActive: null,
                isDeleted: null,
                registrationDate: null,
                joinedDate: null
            })
        });
    }
    ngOnInit() {
        if (this.user) {
            this.form.setValue(this.user);
        }
        else {
            this.user = new User();
            this.user.profile = new UserProfile();
            this.user.work = new UserWork();
            this.user.contacts = new UserContacts();
            this.user.social = new UserSocial();
            this.user.settings = new UserSettings();
        }
    }
    close() {
        this.dialogRef.close();
    }
};
UserDialogComponent = __decorate([
    Component({
        selector: 'app-user-dialog',
        templateUrl: './user-dialog.component.html',
        styleUrls: ['./user-dialog.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [MatDialogRef,
        User,
        FormBuilder])
], UserDialogComponent);
export { UserDialogComponent };
//# sourceMappingURL=user-dialog.component.js.map