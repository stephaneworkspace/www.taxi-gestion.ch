/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; the source ode is released under and Creative
 * Commons License.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({selector : 'app-dialog', templateUrl : './dialog.component.html'})
export class DialogComponent {
  public animal: string;
  public name: string;
  private settings: Settings;
  public constructor(private appSettings: AppSettings,
                     private dialog: MatDialog) {
    this.settings = this.appSettings.settings;
  }

  public openDialog(): void {
    const dialogRef =
        this.dialog.open(DialogOverviewExampleDialog,
                         {data : {name : this.name, animal : this.animal}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector : 'dialog-overview-example-dialog', // tslint:disable-line
  templateUrl : 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog { // tslint:disable-line
  public constructor(private dialogRef:
                         MatDialogRef<DialogOverviewExampleDialog>,
                     @Inject(MAT_DIALOG_DATA) public data: any) {}

  public onNoClick(): void { this.dialogRef.close(); }
}
