import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogPeriodeComptaDialog } from './dialog/dialog-periode-compta';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public settings: Settings;
  constructor(public appSettings: AppSettings, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    //this.openDialog();
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
