var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { TGC001BilanService } from '../../../_services/TGC001BilanService';
import { ActivatedRoute } from '@angular/router';
// Kendo UI
import { process, aggregateBy, orderBy } from '@progress/kendo-data-query';
export var StatusWindows;
(function (StatusWindows) {
    StatusWindows[StatusWindows["Bilan"] = 0] = "Bilan";
    StatusWindows[StatusWindows["Classe"] = 1] = "Classe";
    StatusWindows[StatusWindows["Groupe"] = 2] = "Groupe";
    StatusWindows[StatusWindows["SousGroupe"] = 3] = "SousGroupe";
})(StatusWindows || (StatusWindows = {}));
let SortingComponent = class SortingComponent {
    constructor(appSettings, route, 
    // private tablesService:TablesService, 
    tgB001BilanServcice) {
        this.appSettings = appSettings;
        this.route = route;
        this.tgB001BilanServcice = tgB001BilanServcice;
        this.StatusWindows = StatusWindows;
        this.sort = [{
                field: 'id',
                dir: 'asc'
            }];
        this.allowUnsort = true;
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
        this.aggregates = [{ field: 'UnitPrice', aggregate: 'sum' }];
        this.state = {
            skip: 0,
            take: 5 //,
            //group: [{ field: 'UnitPrice', aggregates: this.aggregates }]
        };
        this.data = [{
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
        this.gridData = process(this.data, this.state);
        this.total = aggregateBy(this.data, this.aggregates);
        this.settings = this.appSettings.settings;
        // this.dataSource = new MatTableDataSource<Element>(this.tablesService.getData());
        // this.dataSource2 = new MatTableDataSource<Dto>(this.tgB001PlanComptableServcice.getPlanComptable());
    }
    ngOnInit() {
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
    loadClasses() {
        this.classes = new Array();
        this.classes = this.tgB001BilanServcice.computeClasse(this.items);
        this.classesBilan = this.classes.filter((x) => {
            return (x.noClasse == 1 || x.noClasse == 2);
        });
        this.totalBilan = this.tgB001BilanServcice.computeTotalBilan(this.classesBilan);
        this.classesExploitation = this.classes.filter((x) => {
            return (x.noClasse != 1 && x.noClasse != 2);
        });
        this.totalExploitation = this.tgB001BilanServcice.computeTotalBilan(this.classesExploitation);
    }
    /**
     * Zoom in Bilan -> Classe
     * @param e
     * @param dataItem
     */
    classeZoomInClick(e, dataItem) {
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
    classeZoomOutClick() {
        this.statusWindows = StatusWindows.Bilan;
    }
    /**
     * Zoom in Classe -> Groupe
     * @param e
     * @param dataItem
     */
    groupeZoomInClick(e, dataItem) {
        this.groupeSelect = dataItem;
        this.sort = [{
                field: 'id',
                dir: 'asc'
            }];
        this.sortSousGroupesChange(this.sort);
        this.statusWindows = StatusWindows.Groupe;
    }
    /**
     * Zoom out Groupe -> Classe
     */
    groupeZoomOutClick() {
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
    sousGroupeZoomInClick(e, dataItem) {
        this.sousGroupeSelect = dataItem;
        this.sort = [{
                field: 'id',
                dir: 'asc'
            }];
        this.sortComptesChange(this.sort);
        this.statusWindows = StatusWindows.SousGroupe;
    }
    compteZoomInClick(e, dataItem) {
        // a faire
        alert('à faire');
    }
    /**
     * Zoom out Sous-groupe -> Groupe
     */
    sousGroupeZoomOutClick() {
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
    sortGroupesChange(sort) {
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
    sortSousGroupesChange(sort) {
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
    sortComptesChange(sort) {
        this.sort = sort;
        this.gridView = {
            data: orderBy(this.sousGroupeSelect.comptes, this.sort),
            total: this.sousGroupeSelect.comptes.length
        };
    }
    dataStateChange(state) {
        if (state && state.group) {
            state.group.map(group => group.aggregates = this.aggregates);
        }
        this.state = state;
        this.gridData = process(this.data, this.state);
    }
};
SortingComponent = __decorate([
    Component({
        selector: 'app-sorting',
        templateUrl: './sorting.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings,
        ActivatedRoute,
        TGC001BilanService])
], SortingComponent);
export { SortingComponent };
//# sourceMappingURL=sorting.component.js.map