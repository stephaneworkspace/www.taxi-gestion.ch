import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { TablesService, Element } from '../tables.service';
import { TGC001BilanService, Bilan, Classe, Groupe, SousGroupe, Compte } from '../../../_services/TGC001BilanService'
import { DtoTGC001OutDC10CompteForList as Dto } from 'src/app/_dto/TGC/DtoTGC001OutDC10CompteForList';
import { ActivatedRoute } from '@angular/router';

// Kendo UI
import { process, GroupDescriptor, State, aggregateBy, SortDescriptor, orderBy } from '@progress/kendo-data-query';

import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';

export enum StatusWindows {
  Bilan,
  Classe,
  Groupe,
  SousGroupe,
}

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html'
})
export class SortingComponent implements OnInit {
  public statusWindows: StatusWindows;
  StatusWindows : typeof StatusWindows = StatusWindows;

  public items: Dto[];
  public classes: Classe[];
  public totalBilan: Bilan;
  public classesBilan: Classe[];
  public totalExploitation: Bilan;
  public classesExploitation: Classe[];

  // Groupe / Sous Groupe
  public classeSelect: Classe;
  public groupeSelect: Groupe;
  public sousGroupeSelect: SousGroupe;
  public gridView: GridDataResult;
  public sort: SortDescriptor[] = [{
    field: 'id',
    dir: 'asc'
  }];
  public allowUnsort = true;

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // public dataSource: any;
  // public dataSource2: any;
  public settings: Settings;

  constructor(
    public appSettings:AppSettings, 
    private route: ActivatedRoute,
    // private tablesService:TablesService, 
    private tgB001BilanServcice: TGC001BilanService
  ) {
    this.settings = this.appSettings.settings; 
    // this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());
    // this.dataSource2 = new MatTableDataSource<Dto>(this.tgB001PlanComptableServcice.getPlanComptable());
 }

  ngOnInit(): void {
    this.statusWindows = StatusWindows["Bilan"];
    this.route.data.subscribe(data => {
      this.items = data['items'];
      this.loadClasses();
    });
  }

  /**
   * Calcul en plusieurs étages du bilan (Classe -> Groupe -> Sous-Groupe -> Comptes)
   * Séparation du bilan et de l'exploitation
   */
  private loadClasses(): void {
      this.classes = new Array();
      this.classes = this.tgB001BilanServcice.computeClasse(this.items);
      this.classesBilan = this.classes.filter((x) => {
        return(x.noClasse == 1 || x.noClasse == 2) 
      });
      this.totalBilan = this.tgB001BilanServcice.computeTotalBilan(this.classesBilan);
      this.classesExploitation = this.classes.filter((x) => {
        return(x.noClasse != 1 && x.noClasse != 2) 
      });
      this.totalExploitation = this.tgB001BilanServcice.computeTotalBilan(this.classesExploitation);
  }

  /**
   * Zoom in Bilan -> Classe
   * @param e 
   * @param dataItem 
   */
  public classeZoomInClick(e: any, dataItem: Classe): void {
    this.classeSelect = dataItem;
    this.sort = [{
      field: 'id',
      dir: 'asc'
    }];
    this.sortGroupesChange(this.sort);
    this.statusWindows = StatusWindows.Classe;
  }

  /**
   * Zoom out Classe -> Bilan
   */
  public classeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Bilan;
  }

  /**
   * Zoom in Classe -> Groupe
   * @param e 
   * @param dataItem 
   */
  public groupeZoomInClick(e: any, dataItem: Groupe): void {
    this.groupeSelect = dataItem;
    this.sort = [{
      field: 'id',
      dir: 'asc'
    }];
    this.sortSousGroupesChange(this.sort)
    this.statusWindows = StatusWindows.Groupe
  }

  /**
   * Zoom out Groupe -> Classe
   */
  public groupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Classe;
    this.sort = [{
      field: 'id',
      dir: 'asc'
    }];
    this.sortGroupesChange(this.sort);
  }

    /**
   * Zoom in Groupe -> Sous-groupe
   * @param e 
   * @param dataItem 
   */
  public sousGroupeZoomInClick(e: any, dataItem: SousGroupe): void {
    this.sousGroupeSelect = dataItem;
    this.sort = [{
      field: 'id',
      dir: 'asc'
    }];
    this.sortComptesChange(this.sort)
    this.statusWindows = StatusWindows.SousGroupe
  }

  public compteZoomInClick(e: any, dataItem: Compte): void {
    // a faire
    alert('à faire');
  }

  /**
   * Zoom out Sous-groupe -> Groupe
   */
  public sousGroupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Groupe;
    this.sort = [{
      field: 'id',
      dir: 'asc'
    }];
    this.sortSousGroupesChange(this.sort);
  }

  /**
   * Tri - Groupe
   * @param sort 
   */
  public sortGroupesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
        data: orderBy(this.classeSelect.groupes, this.sort),
        total: this.classeSelect.groupes.length
    };
  }

  /**
   * Tri - Sous-groupe
   * @param sort 
   */
  public sortSousGroupesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
        data: orderBy(this.groupeSelect.sousGroupes, this.sort),
        total: this.groupeSelect.sousGroupes.length
    };
  }

  /**
   * Tri - Compte
   * @param sort 
   */
  public sortComptesChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
        data: orderBy(this.sousGroupeSelect.comptes, this.sort),
        total: this.sousGroupeSelect.comptes.length
    };
  }

/*
  computeClasseArray(dto: Dto[], id: number): Classe[] {
    return this.tgB001PlanComptableServcice.computeClasse(dto).filter(x => x.id === id);
  }

  computeGroupeArray(dto: Dto[], idClasse: number, idGroupe: number): Groupe[] {
    let classes = this.tgB001PlanComptableServcice.computeClasse(dto).filter(x => x.id === idClasse)
    let newGroupes: Groupe[];
    newGroupes = new Array();
    // Uniquement 1 classe sélectionné, donc cette logique fonctionne
    classes.forEach(classe => {
      newGroupes = classe.groupes.filter(x => x.id == idGroupe).slice()
    });
    return newGroupes;
  }*/

/* mat sort grid
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  } */

  public aggregates: any[] = [{field: 'UnitPrice', aggregate: 'sum'}];

  public state: State = {
      skip: 0,
      take: 5//,
      //group: [{ field: 'UnitPrice', aggregates: this.aggregates }]
  };

  public data = [{
      'ProductID': 1,
      'ProductName': 'Chai',
      'UnitPrice': 18.0000,
      'Discontinued': true
  }, {
      'ProductID': 2,
      'ProductName': 'Chang',
      'UnitPrice': 19.0000,
      'Discontinued': false
  }, {
      'ProductID': 3,
      'ProductName': 'Aniseed Syrup',
      'UnitPrice': 10.0000,
      'Discontinued': false
  }, {
      'ProductID': 4,
      'ProductName': "Chef Anton\'s Cajun Seasoning",
      'UnitPrice': 22.0000,
      'Discontinued': false
  }, {
      'ProductID': 5,
      'ProductName': "Chef Anton\'s Gumbo Mix",
      'UnitPrice': 21.3500,
      'Discontinued': false
  }, {
      'ProductID': 6,
      'ProductName': "Grandma\'s Boysenberry Spread",
      'UnitPrice': 25.0000,
      'Discontinued': false
  }, {
      'ProductID': 7,
      'ProductName': "Chai",
      'UnitPrice': 22.0000,
      'Discontinued': true
  }];

  public gridData: any = process(this.data, this.state);
  public total: any = aggregateBy(this.data, this.aggregates);

  public dataStateChange(state: DataStateChangeEvent): void {
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.gridData = process(this.data, this.state);
  }

}