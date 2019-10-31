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

  private dA20Config: Dto;

  public settings: Settings;
  constructor(public appSettings: AppSettings,
              public dialog: MatDialog,
              private route: ActivatedRoute,) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dA20Config = data['config'];
      // undefined, no record DA20COnfig
      /*if (this.dA20Config === undefined) {
        this.openDialog(); => dialogRef.afterClosed().subscribe(result => {
      }*/
      // if (this.dA20Congig.periodeComptaDateDebut < 20180101)
      // if (this.dA20Congig.periodeComptaDateFin < 20180101)
      //console.log(this.dA020Config);
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
