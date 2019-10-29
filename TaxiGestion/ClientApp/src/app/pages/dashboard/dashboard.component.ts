import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogPeriodeComptaDialog } from './dialog/dialog-periode-compta';
import { ActivatedRoute } from '@angular/router';
import { DtoTGA002OutDA20ConfigForSelect as Dto } from 'src/app/_dto/TGA/DtoTGA002OutDA20ConfigForSelect';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private dA020Config: Dto;

  public settings: Settings;
  constructor(public appSettings: AppSettings,
              public dialog: MatDialog,
              private route: ActivatedRoute,) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    //this.openDialog();
    this.route.data.subscribe(data => {
      this.dA020Config = data['config'];
      // if (this.dA020Config == undefined)
      // if (this.dA020Congig.periodeComptaDateDebut < 20180101)
      // if (this.dA020Congig.periodeComptaDateFin < 20180101)
      //console.log(this.dA020Config);
      // To do
      /*
      this.form  = this.fb.group({
        'dateEcriture': this.fb.group({
          'dateEcriture': [null, Validators.compose([Validators.required])],
        }),
        'montant': this.fb.group({
          montant: [null, Validators.compose([Validators.required, montantValidator()])]
        }),
        'piece': this.fb.group({
          'noPiece': [null],
          'datePiece': [null],
        }),
        'compteDebit': this.fb.group({
          noCompteDebit: [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])],
          compteDebit: [{value: '', disabled: true}],
        }),
        'libelleDebit': this.fb.group({
          'libelle1Debit': [null],
          'libelle2Debit': [null]
        }),
        'compteCredit': this.fb.group({
          noCompteCredit: [null, Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)])],
          compteCredit: [{value: '', disabled: true}],
        }),
        'libelleCredit': this.fb.group({
          'libelle1Credit': [null],
          'libelle2Credit': [null]
        }),
      }, {validator: this.compteIdentitiqueValidator()
      });
    });*/
    });
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    // let
    const dialogRef = this.dialog.open(DialogPeriodeComptaDialog, dialogConfig); /* {
      // data: { name: this.name, animal: this.animal }
    });*/

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
