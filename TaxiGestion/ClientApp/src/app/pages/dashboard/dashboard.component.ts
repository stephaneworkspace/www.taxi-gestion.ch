import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // private dA21Config: Dto; -> Dans la comptabilité uniquement
  // sinon ça fais une redirection vers le même popup

  public settings: Settings;
  constructor(public appSettings: AppSettings) {
              // public dialog: MatDialog,
              // private route: ActivatedRoute) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    /*
    this.route.data.subscribe(data => {
      this.dA21Config = data['config'];
      if (this.dA21Config === undefined || this.dA21Config === null) {
        this.openDialog();
      }
    });*/
  }

  /*
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (this.dA21Config === undefined || this.dA21Config === null) {
      const year: number = new Date().getFullYear();
      dialogConfig.data = {
        periodeComptaDateDebut: new Date(year, 1 - 1, 1), // range month = 0-11
        periodeComptaDateFin: new Date(year, 12 - 1, 31), // range month = 0-11
      };
    } else {
      // not used in dashboard
      dialogConfig.data = {
        periodeComptaDateDebut: this.dA21Config.periodeComptaDateDebut,
        periodeComptaDateFin: this.dA21Config.periodeComptaDateFin
      };
    }

    // let
    const dialogRef = this.dialog.open(DialogPeriodeComptaDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }*/
}
