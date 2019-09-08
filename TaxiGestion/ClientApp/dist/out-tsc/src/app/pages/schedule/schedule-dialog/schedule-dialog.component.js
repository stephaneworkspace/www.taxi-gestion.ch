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
let ScheduleDialogComponent = class ScheduleDialogComponent {
    constructor(dialogRef, data, formBuilder) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.form = this.formBuilder.group({
            'title': ['', Validators.required],
            'start': ['', Validators.required],
            'end': '',
            'isEdit': false
        });
    }
    ngOnInit() {
        if (this.data) {
            this.form.patchValue({
                'title': this.data.title,
                'start': this.data.start,
                'end': this.data.end,
                'isEdit': true
            });
        }
    }
    close() {
        this.dialogRef.close();
    }
};
ScheduleDialogComponent = __decorate([
    Component({
        selector: 'app-schedule-dialog',
        templateUrl: './schedule-dialog.component.html'
    }),
    __param(1, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [MatDialogRef, Object, FormBuilder])
], ScheduleDialogComponent);
export { ScheduleDialogComponent };
//# sourceMappingURL=schedule-dialog.component.js.map