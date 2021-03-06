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
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {orderBy, SortDescriptor} from '@progress/kendo-data-query';
import {
  DtoTGA002OutDA21ConfigForSelect
} from 'src/app/_dto/TGA/DtoTGA002OutDA21ConfigForSelect';

import {
  DtoTGC001OutDC10CompteForList as DtoDC10
} from '../../../../app/_dto/TGC/DtoTGC001OutDC10CompteForList';
import {
  DtoTGC001OutDC21EcritureForList as DtoDC21
} from '../../../../app/_dto/TGC/DtoTGC001OutDC21EcritureForList';
import {
  DtoTGC001OutDC21EcritureForListColl as DtoDC21Coll
} from '../../../../app/_dto/TGC/DtoTGC001OutDC21EcritureForListColl';
import {
  Bilan,
  Classe,
  Compte,
  Ecriture,
  EcritureCollective,
  EcritureCollectiveMontant,
  Groupe,
  SousGroupe,
  TGC001BilanService
} from '../../../_services/TGC001BilanService';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {DialogPeriodeComptaDialog} from '../dialog/dialog-periode-compta';

export enum StatusWindows {
  Bilan,
  Classe,
  Groupe,
  SousGroupe,
  Compte,
  DetailCompte
}

@Component({
  selector : 'app-bilan-ecran',
  templateUrl : './bilan-ecran.component.html',
  encapsulation : ViewEncapsulation.None,
})
export class BilanEcranComponent implements OnInit {
  public statusWindows: StatusWindows;
  public StatusWindows: typeof StatusWindows = StatusWindows;
  private items: DtoDC10[];
  private classes: Classe[];
  private totalBilan: Bilan;
  private classesBilan: Classe[];
  private totalExploitation: Bilan;
  private classesExploitation: Classe[];
  private selectionEcritures: Ecriture[];
  private selectionEcrituresCollective: EcritureCollective[];

  // Groupe / Sous Groupe
  private classeSelect: Classe;
  private groupeSelect: Groupe;
  private sousGroupeSelect: SousGroupe;
  private compteSelect: Compte;
  private ecritureSelect: Ecriture;
  private ecritureCollectiveMontant: EcritureCollectiveMontant;
  private gridView: GridDataResult;
  private gridViewEcrituresCollective: GridDataResult;
  private sort: SortDescriptor[] = [ {field : 'noClasse', dir: 'asc'} ];
  private sortEcrituresCollective: SortDescriptor[] =
      [ {field : 'noEcriture', dir: 'asc'} ];
  private allowUnsort = true;

  private settings: Settings;

  // DA21Config
  private dA21Config: DtoTGA002OutDA21ConfigForSelect;

  // Resolver
  private RESOLVER_DATA_CONFIG = 'config';
  private RESOLVER_DATA_ITEMS = 'items';

  /**
   * Constructor
   * @param appSettings Settings
   * @param route Injection activated route
   * @param service Injection TGC001Bilan service
   * @param snackBar Injection Mat snack bar
   * @param dialog Injection Mat dialog
   * @param router Injection router
   * @returns void
   */
  public constructor(private appSettings: AppSettings,
                     private route: ActivatedRoute,
                     private service: TGC001BilanService,
                     private snackBar: MatSnackBar, private dialog: MatDialog,
                     private router: Router) {
    this.settings = this.appSettings.settings;
  }

  /**
   * On init
   * Chargement DA21Config, sécurité pour la période comptable
   * Puis ensuite chargement du bilan en commencant par les classes
   * (this.loadClasses())
   * @returns void
   */
  public ngOnInit(): void {
    this.statusWindows = StatusWindows.Bilan;
    this.route.data.subscribe(data => {
      this.dA21Config = data[this.RESOLVER_DATA_CONFIG];
      if (this.dA21Config === undefined || this.dA21Config === null) {
        this.openDialog();
      }
      this.items = data[this.RESOLVER_DATA_ITEMS];
      this.loadClasses();
    });
  }

  /**
   * Dialog pour configuer les dates de la période comptable du bilan
   * @param null aucune param
   * @returns void
   */
  private openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (this.dA21Config === undefined || this.dA21Config === null) {
      const year: number = new Date().getFullYear();
      dialogConfig.data = {
        periodeComptaDateDebut : new Date(year, 1 - 1, 1), // range month = 0-11
        periodeComptaDateFin : new Date(year, 12 - 1, 31), // range month = 0-11
      };
    } else {
      // technically not possible, is null or is valid, in backend logic
      dialogConfig.data = {
        periodeComptaDateDebut : this.dA21Config.periodeComptaDateDebut,
        periodeComptaDateFin : this.dA21Config.periodeComptaDateFin
      };
    }
    const dialogRef = this.dialog.open(DialogPeriodeComptaDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        this.router.navigate([ '/index' ]);
        this.snackBar.open(
            'Dates de période obligatoires', 'Configuration comptabilité',
            {duration : 7000, panelClass : [ 'warning-snackbar' ]});
      }
    });
  }

  /**
   * Refraichit le plan comptable
   * @returns void
   */
  private btnClickRafraichir(): void {
    this.service.getPlanComptable().subscribe(
        (res: DtoDC10[]) => {
          this.items = res.slice();
          this.loadClasses();
        },
        error => {
          this.snackBar.open(
              'Erreur lors du chargement du bilan', 'Erreur Http',
              {duration : 7000, panelClass : [ 'error-snackbar' ]});
        });
  }

  /**
   * Calcul en plusieurs étages du bilan (Classe -> Groupe -> Sous-Groupe ->
   * Comptes) Séparation du bilan et de l'exploitation
   * @returns void
   */
  private loadClasses(): void {
    this.classes = new Array();
    this.classes = this.service.computeClasse(this.items);
    this.classesBilan =
        this.classes.filter((x) => ((x.noClasse === 1 || x.noClasse === 2)));
    this.totalBilan = this.service.computeTotalBilan(this.classesBilan);
    this.classesExploitation =
        this.classes.filter((x) => ((x.noClasse !== 1 && x.noClasse !== 2)));
    this.totalExploitation =
        this.service.computeTotalBilan(this.classesExploitation);
  }

  /**
   * Zoom in Bilan -> Classe
   * @param e Event
   * @param dataItem Classe
   * @return void
   */
  private classeZoomInClick(e: any, dataItem: Classe): void {
    this.classeSelect = dataItem;
    this.sort = [ {field : 'noGroupe', dir : 'asc'} ];
    this.sortGroupesChange(this.sort);
    this.statusWindows = StatusWindows.Classe;
  }

  /**
   * Zoom out Classe -> Bilan
   * @returns void
   */
  private classeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Bilan;
  }

  /**
   * Zoom in Classe -> Groupe
   * @param e Event
   * @param dataItem Groupe
   * @return void
   */
  private groupeZoomInClick(e: any, dataItem: Groupe): void {
    this.groupeSelect = dataItem;
    this.sort = [ {field : 'noSousGroupe', dir : 'asc'} ];
    this.sortSousGroupesChange(this.sort);
    this.statusWindows = StatusWindows.Groupe;
  }

  /**
   * Zoom out Groupe -> Classe
   * @returns void
   */
  private groupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Classe;
    this.sort = [ {field : 'noGroupe', dir : 'asc'} ];
    this.sortGroupesChange(this.sort);
  }

  /**
   * Zoom in Groupe -> Sous-groupe
   * @param e Event
   * @param dataItem Sous groupe
   * @return void
   */
  private sousGroupeZoomInClick(e: any, dataItem: SousGroupe): void {
    this.sousGroupeSelect = dataItem;
    this.sort = [ {field : 'noCompte', dir : 'asc'} ];
    this.sortComptesChange(this.sort);
    this.statusWindows = StatusWindows.SousGroupe;
  }

  /**
   * Zoom out Sous-groupe -> Groupe
   * @return void
   */
  private sousGroupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Groupe;
    this.sort = [ {field : 'noSousGroupe', dir : 'asc'} ];
    this.sortSousGroupesChange(this.sort);
  }

  /**
   * Zoom in Compte
   * @param e Event
   * @param dataItem Compte
   * @return void
   */
  private compteZoomInClick(e: any, dataItem: Compte): void {
    this.service.getEcritures(dataItem.noCompte)
        .subscribe(
            (res: DtoDC21[]) => {
              this.selectionEcritures = this.service.computeEcriture(res);
              this.compteSelect = dataItem;
              this.sort = [ {field : 'dateEcriture', dir : 'asc'} ];
              this.sortEcrituresChange(this.sort);
              this.statusWindows = StatusWindows.Compte;
            },
            error => {
              this.selectionEcritures =
                  this.service.computeEcriture(new Array());
              this.compteSelect = dataItem;
              this.sort = [ {field : 'dateEcriture', dir : 'asc'} ];
              this.sortEcrituresChange(this.sort);
              this.statusWindows = StatusWindows.Compte;
              this.snackBar.open(
                  'Erreur lors du chargement du compte ' + dataItem.noCompte,
                  'Erreur Http',
                  {duration : 7000, panelClass : [ 'error-snackbar' ]});
            });
  }

  /**
   * Zoom out Compte -> Sous-Groupe
   * @return void
   */
  private compteZoomOutClick(): void {
    this.statusWindows = StatusWindows.SousGroupe;
    this.sort = [ {field : 'noCompte', dir : 'asc'} ];
    // this.sortEcrituresChange(this.sort);
    this.sortComptesChange(this.sort);
  }

  /**
   * Zoom in Détail du compte
   * @param e Event
   * @param dataItem Ecriture
   * @return void
   */
  private compteDetailZoomInClick(e: any, dataItem: Ecriture): void {
    this.ecritureSelect = dataItem;
    if (dataItem.swEcritureCollective === dataItem.swEcritureCollective) {
      this.service.getEcrituresCollective(dataItem.noEcritureCollective)
          .subscribe(
              (res: DtoDC21Coll[]) => {
                this.selectionEcrituresCollective =
                    this.service.computeEcritureCollective(res);
                this.ecritureCollectiveMontant =
                    this.service.computeEcritureCollectiveMontant(res);
                this.sort = [ {field : 'noEcriture', dir : 'desc'} ];
                this.sortEcrituresCollectiveChange(this.sort);
              },
              error => {
                this.selectionEcrituresCollective =
                    this.service.computeEcritureCollective(new Array());
                this.ecritureCollectiveMontant =
                    this.service.computeEcritureCollectiveMontant(new Array());
                this.sort = [ {field : 'noEcriture', dir : 'desc'} ];
                this.sortEcrituresCollectiveChange(this.sort);
                this.snackBar.open(
                    'Erreur lors du chargement de l\'écr. coll. ' +
                        dataItem.noEcritureCollective,
                    'Erreur Http',
                    {duration : 7000, panelClass : [ 'error-snackbar' ]});
              });
    }
    this.statusWindows = StatusWindows.DetailCompte;
  }

  /**
   * Zoom out Détail compte -> Compte
   * @return void
   */
  private compteDetailZoomOutClick(): void {
    this.statusWindows = StatusWindows.Compte;
    this.sort = [ {field : 'dateEcriture', dir : 'asc'} ];
    this.sortEcrituresChange(this.sort);
  }

  /**
   * Tri - Groupe
   * @param sort KendoSort SortDescriptor array
   * @return void
   */
  private sortGroupesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data : orderBy(this.classeSelect.groupes, this.sort),
      total : this.classeSelect.groupes.length
    };
  }

  /**
   * Tri - Sous-groupe
   * @param sort KendoSort SortDescriptor array
   * @return void
   */
  private sortSousGroupesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data : orderBy(this.groupeSelect.sousGroupes, this.sort),
      total : this.groupeSelect.sousGroupes.length
    };
  }

  /**
   * Tri - Compte
   * @param sort KendoSort SortDescriptor array
   * @return void
   */
  private sortComptesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data : orderBy(this.sousGroupeSelect.comptes, this.sort),
      total : this.sousGroupeSelect.comptes.length
    };
  }

  /**
   * Tri - Ecritures
   * @param sort KendoSort SortDescriptor array
   * @return void
   */
  private sortEcrituresChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data : orderBy(this.selectionEcritures, this.sort),
      total : this.selectionEcritures.length
    };
  }

  /**
   * Tri - Ecritures
   * @param sort KendoSort SortDescriptor array
   * @return void
   */
  private sortEcrituresCollectiveChange(sort: SortDescriptor[]): void {
    this.sortEcrituresCollective = sort;
    this.gridViewEcrituresCollective = {
      data : orderBy(this.selectionEcrituresCollective,
                     this.sortEcrituresCollective),
      total : this.selectionEcrituresCollective.length
    };
  }

  /**
   * A faire
   * @return void
   */
  private btnAfaire() { alert('À faire'); }
}
