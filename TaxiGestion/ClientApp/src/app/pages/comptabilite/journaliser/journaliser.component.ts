import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { DtoTGC003OutDC30EcritureJournalForListMod as Dto } from 'src/app/_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';
import { TGC002JournalisationService as Service } from 'src/app/_services/TGC002JournalisationService';

import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { TGC003SaisieEcrituresService, EcrituresTotal } from 'src/app/_services/TGC003SaisieEcrituresService';
import { DtoTGA002OutDA21ConfigForSelect } from 'src/app/_dto/TGA/DtoTGA002OutDA21ConfigForSelect';
import { DialogPeriodeComptaDialog } from '../dialog/dialog-periode-compta';

@Component({
  selector: 'app-journaliser',
  templateUrl: './journaliser.component.html',
 // styleUrls: ['./journaliser.component.scss']
})
export class JournaliserComponent implements OnInit {
  public ecritures: Dto[];
  public ecrituresTotal: EcrituresTotal;
  public gridView: GridDataResult;
  public gridViewEcrituresCollective: GridDataResult;
  public sort: SortDescriptor[] = [{
    field: 'noSort',
    dir: 'asc'
  }];
  public allowUnsort = true;

  public settings: Settings;

  // DA21Config
  private dA21Config: DtoTGA002OutDA21ConfigForSelect;

  // Resolver
  private RESOLVER_DATA_CONFIG = 'config';
  private RESOLVER_DATA_ECRITURES = 'ecritures';

  /**
   * Constructor
   * @param appSettings Settings
   * @param route Injection activated route
   * @param router Injection router
   * @param service Injection TGC002JournalisationService service
   * @param serviceEcritures Injection TGC003SaisieEcrituresService service
   * @param snackBar Injection Mat snack bar
   * @param dialog Injection Mat dialog
   * @returns void
   */
  constructor(
    public appSettings: AppSettings,
    private route: ActivatedRoute,
    private router: Router,
    private service: Service,
    private serviceEcritures: TGC003SaisieEcrituresService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // this.settings = this.appSettings.settings;
 }

  public pageSize = 10;
  public skip = 0;

  /**
   * Kendo grid
   * @param pageIndex Index de la page
   * @return void
   */
  public sliderChange(pageIndex: number): void {
      this.skip = (pageIndex - 1) * this.pageSize;
  }

  /**
   * Kendo grid
   * @param state Kendo grid state
   * @return void
   */
  public onPageChange(state: any): void {
      this.pageSize = state.take;
  }

  /**
   * On init
   * Chargement de la période comptable DA21Config
   * Puis chargement des écritures en attente de journalisation
   * @returns void
   */
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dA21Config = data[this.RESOLVER_DATA_CONFIG];
      if (this.dA21Config === undefined || this.dA21Config === null) {
        this.openDialog();
      }
      this.ecritures = this.serviceEcritures.computeListeDesEcritures(data[this.RESOLVER_DATA_ECRITURES]);
      // this.ecritures.reverse(); // pas de reverse ici, uniquement pour la saisie avant journalisation (saisie-ecritures,components.ts)
      this.ecrituresTotal = this.serviceEcritures.computeTotalEcritures(this.ecritures);
      this.gridView = {
          data: orderBy(this.ecritures, this.sort),
          total: this.ecritures.length
      };
    });
  }

  /**
   * Dialog pour configuer les dates de la période comptable du bilan
   * @param null aucune param
   * @returns void
   */
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
      // technically not possible, is null or is valid, in backend logic
      dialogConfig.data = {
        periodeComptaDateDebut: this.dA21Config.periodeComptaDateDebut,
        periodeComptaDateFin: this.dA21Config.periodeComptaDateFin
      };
    }
    const dialogRef = this.dialog.open(DialogPeriodeComptaDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        this.router.navigate(['/index']);
        this.snackBar.open('Les date de période sont obligatoires', 'Configuration comptabilité', {
          duration: 7000,
          panelClass: ['warning-snackbar']
        });
      }
    });
  }

  /**
   * A faire
   * @return void
   */
  btnAFaire(): void {
    alert('À faire');
  }

  /**
   * Bouton traitement de la journalisation
   * @return void
   */
  btnSubmit(): void {
    if (this.ecritures === undefined || this.ecritures.length === 0) {
      this.snackBar.open('Rien à journaliser', 'Comptabilité', {
        duration: 2000,
        panelClass: ['warning-snackbar']
      });
    } else {
      this.service.journaliser().subscribe(next => {
        this.snackBar.open('Journalisation avec succès', 'Message', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/index/comptabilite/']);
      }, error => {
        console.log(error);
        this.snackBar.open('Erreur pendant la journalisation', 'Erreur Http', {
          duration: 7000,
          panelClass: ['error-snackbar']
        });
      });
    }
  }
}
