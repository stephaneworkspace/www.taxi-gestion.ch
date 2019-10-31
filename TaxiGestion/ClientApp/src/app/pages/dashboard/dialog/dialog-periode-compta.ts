import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldControl, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DtoTGA002InpDA20ConfigForWrite as DtoDA20 } from 'src/app/_dto/TGA/DtoTGA002InpDA20ConfigForWrite';
import { TGA002ConfigService } from 'src/app/_services/TGA002ConfigService';

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
        public fb: FormBuilder,
        private serviceTGA002: TGA002ConfigService,
        private snackBar: MatSnackBar) { }

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
        // Envoi du formulaire
        if (this.form.valid 
        && this.form.controls.dateExerciceCompta.valid)
        {
            const dto: DtoDA20 = {
                periodeComptaDateDebut: new Date(this.form.controls.dateExerciceCompta.get('dateExerciceComptaDebut').value),
                periodeComptaDateFin: new Date(this.form.controls.dateExerciceCompta.get('dateExerciceComptaFin').value),
            };
            this.serviceTGA002.postConfig(dto).subscribe(next => {
                this.snackBar.open('La comptabilité est prête à être utilisée', 'Message', {
                    duration: 2000,
                    panelClass: ['success-snackbar']
                  });
                this.dialogRef.close();
            }, error => {
                console.log(error);
                this.snackBar.open('Erreur pendant l\'envoi de la configuration de la comptabilité', 'Erreur Http', {
                  duration: 7000,
                  panelClass: ['error-snackbar']
                });
            })
        }
    }
}