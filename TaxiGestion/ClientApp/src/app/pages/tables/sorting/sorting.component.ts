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
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {
  DataStateChangeEvent,
  GridComponent,
  GridDataResult
} from '@progress/kendo-angular-grid';
// Kendo UI
import {
  aggregateBy,
  GroupDescriptor,
  orderBy,
  process,
  SortDescriptor,
  State
} from '@progress/kendo-data-query';
import {
  DtoTGC001OutDC10CompteForList as Dto
} from 'src/app/_dto/TGC/DtoTGC001OutDC10CompteForList';

import {
  Bilan,
  Classe,
  Compte,
  Groupe,
  SousGroupe,
  TGC001BilanService
} from '../../../_services/TGC001BilanService';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {Element, TablesService} from '../tables.service';

export enum StatusWindows {
  Bilan,
  Classe,
  Groupe,
  SousGroupe,
}

@Component({selector : 'app-sorting', templateUrl : './sorting.component.html'})
export class SortingComponent implements OnInit {
  public statusWindows: StatusWindows;
  public StatusWindows: typeof StatusWindows = StatusWindows;

  private items: Dto[];
  private classes: Classe[];
  private totalBilan: Bilan;
  private classesBilan: Classe[];
  private totalExploitation: Bilan;
  private classesExploitation: Classe[];

  // Groupe / Sous Groupe
  private classeSelect: Classe;
  private groupeSelect: Groupe;
  private sousGroupeSelect: SousGroupe;
  private gridView: GridDataResult;
  private sort: SortDescriptor[] = [ {field : 'id', dir: 'asc'} ];
  private allowUnsort = true;

  public aggregates: any[] = [ {field : 'UnitPrice', aggregate: 'sum'} ];

  public state: State = {skip : 0, take: 5};

  public data = [
    {
      ProductID : 1,
      ProductName: 'Chai',
      UnitPrice: 18.0000,
      Discontinued: true
    },
    {
      ProductID : 2,
      ProductName: 'Chang',
      UnitPrice: 19.0000,
      Discontinued: false
    },
    {
      ProductID : 3,
      ProductName: 'Aniseed Syrup',
      UnitPrice: 10.0000,
      Discontinued: false
    },
    {ProductID : 4, ProductName: 'Chai', UnitPrice: 22.0000, Discontinued: true}
  ];

  public gridData: any = process(this.data, this.state);
  public total: any = aggregateBy(this.data, this.aggregates);

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // public dataSource: any;
  // public dataSource2: any;
  private settings: Settings;

  public constructor(private appSettings: AppSettings,
                     private route: ActivatedRoute,
                     // private tablesService:TablesService,
                     private tgB001BilanServcice: TGC001BilanService) {
    this.settings = this.appSettings.settings;
    // this.dataSource = new
    // MatTableDataSource<Element>(this.tablesService.getData());
    // this.dataSource2 = new
    // MatTableDataSource<Dto>(this.tgB001PlanComptableServcice.getPlanComptable());
  }

  public ngOnInit(): void {
    const BILAN = 'Bilan';
    const ITEMS = 'items';
    this.statusWindows = StatusWindows[BILAN];
    this.route.data.subscribe(data => {
      this.items = data[ITEMS];
      this.loadClasses();
    });
  }

  /**
   * Calcul en plusieurs étages du bilan (Classe -> Groupe -> Sous-Groupe ->
   * Comptes) Séparation du bilan et de l'exploitation
   */
  private loadClasses(): void {
    this.classes = new Array();
    this.classes = this.tgB001BilanServcice.computeClasse(this.items);
    this.classesBilan =
        this.classes.filter((x) => (x.noClasse === 1 || x.noClasse === 2));
    this.totalBilan =
        this.tgB001BilanServcice.computeTotalBilan(this.classesBilan);
    this.classesExploitation =
        this.classes.filter((x) => (x.noClasse !== 1 && x.noClasse !== 2));
    this.totalExploitation =
        this.tgB001BilanServcice.computeTotalBilan(this.classesExploitation);
  }

  /**
   * Zoom in Bilan -> Classe
   * @param e Event
   * @param dataItea Classe du plan comptable
   */
  private classeZoomInClick(e: any, dataItem: Classe): void {
    this.classeSelect = dataItem;
    this.sort = [ {field : 'id', dir : 'asc'} ];
    this.sortGroupesChange(this.sort);
    this.statusWindows = StatusWindows.Classe;
  }

  /**
   * Zoom out Classe -> Bilan
   */
  private classeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Bilan;
  }

  /**
   * Zoom in Classe -> Groupe
   * @param e Event
   * @param dataItem Groupe du plan comptable
   */
  private groupeZoomInClick(e: any, dataItem: Groupe): void {
    this.groupeSelect = dataItem;
    this.sort = [ {field : 'id', dir : 'asc'} ];
    this.sortSousGroupesChange(this.sort);
    this.statusWindows = StatusWindows.Groupe;
  }

  /**
   * Zoom out Groupe -> Classe
   */
  private groupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Classe;
    this.sort = [ {field : 'id', dir : 'asc'} ];
    this.sortGroupesChange(this.sort);
  }

  /**
   * Zoom in Groupe -> Sous-groupe
   * @param e Event
   * @param dataItem Sous group du plan comptable
   */
  private sousGroupeZoomInClick(e: any, dataItem: SousGroupe): void {
    this.sousGroupeSelect = dataItem;
    this.sort = [ {field : 'id', dir : 'asc'} ];
    this.sortComptesChange(this.sort);
    this.statusWindows = StatusWindows.SousGroupe;
  }

  private compteZoomInClick(e: any, dataItem: Compte): void {
    // a faire
    alert('à faire');
  }

  /**
   * Zoom out Sous-groupe -> Groupe
   */
  private sousGroupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Groupe;
    this.sort = [ {field : 'id', dir : 'asc'} ];
    this.sortSousGroupesChange(this.sort);
  }

  /**
   * Tri - Groupe
   * @param sort Param tri
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
   * @param sort Param tri
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
   * @param sort Param tri
   */
  private sortComptesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data : orderBy(this.sousGroupeSelect.comptes, this.sort),
      total : this.sousGroupeSelect.comptes.length
    };
  }

  private dataStateChange(state: DataStateChangeEvent): void {
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.gridData = process(this.data, this.state);
  }
}
