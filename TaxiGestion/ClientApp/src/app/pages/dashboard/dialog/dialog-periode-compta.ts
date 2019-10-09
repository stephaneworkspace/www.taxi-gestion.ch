import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldControl } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-dialog-period-compta',
    templateUrl: 'dialog-periode-compta.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogPeriodeComptaDialog implements OnInit {

    public form: FormGroup;
    public swTouch = false;

    constructor(
        public dialogRef: MatDialogRef<DialogPeriodeComptaDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public fb: FormBuilder) { }

    ngOnInit(): void {
        this.form  = this.fb.group({
            // tslint:disable-next-line: object-literal-key-quotes
            'dateExerciceCompta': this.fb.group({
                // tslint:disable-next-line: object-literal-key-quotes
                'dateExerciceComptaDebut': [null, Validators.compose([Validators.required])],
                // tslint:disable-next-line: object-literal-key-quotes
                'dateExerciceComptaFin': [null, Validators.compose([Validators.required])],
            }),
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.swTouch = true;
    }
}
