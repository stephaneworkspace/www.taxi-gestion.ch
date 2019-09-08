var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderBy } from '@progress/kendo-data-query';
import { AppSettings } from '../../../app.settings';
import { TGC001BilanService } from '../../../_services/TGC001BilanService';
import { MatSnackBar } from '@angular/material';
export var StatusWindows;
(function (StatusWindows) {
    StatusWindows[StatusWindows["Bilan"] = 0] = "Bilan";
    StatusWindows[StatusWindows["Classe"] = 1] = "Classe";
    StatusWindows[StatusWindows["Groupe"] = 2] = "Groupe";
    StatusWindows[StatusWindows["SousGroupe"] = 3] = "SousGroupe";
    StatusWindows[StatusWindows["Compte"] = 4] = "Compte";
    StatusWindows[StatusWindows["DetailCompte"] = 5] = "DetailCompte";
})(StatusWindows || (StatusWindows = {}));
let BilanEcranComponent = class BilanEcranComponent {
    constructor(appSettings, route, service, snackBar) {
        this.appSettings = appSettings;
        this.route = route;
        this.service = service;
        this.snackBar = snackBar;
        this.StatusWindows = StatusWindows;
        this.sort = [{
                field: 'noClasse',
                dir: 'asc'
            }];
        this.sortEcrituresCollective = [{
                field: 'noEcriture',
                dir: 'asc'
            }];
        this.allowUnsort = true;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.statusWindows = StatusWindows["Bilan"];
        this.route.data.subscribe(data => {
            this.items = data['items'];
            this.loadClasses();
        });
    }
    btnClickRafraichir() {
        this.service.getPlanComptable().subscribe((res) => {
            this.items = res.slice();
            this.loadClasses();
        }, error => {
            this.snackBar.open('Erreur lors du chargement du bilan', 'Erreur Http', {
                duration: 7000,
                panelClass: ['error-snackbar']
            });
        });
    }
    /**
     * Calcul en plusieurs étages du bilan (Classe -> Groupe -> Sous-Groupe -> Comptes)
     * Séparation du bilan et de l'exploitation
     */
    loadClasses() {
        this.classes = new Array();
        this.classes = this.service.computeClasse(this.items);
        this.classesBilan = this.classes.filter((x) => {
            return (x.noClasse == 1 || x.noClasse == 2);
        });
        this.totalBilan = this.service.computeTotalBilan(this.classesBilan);
        this.classesExploitation = this.classes.filter((x) => {
            return (x.noClasse != 1 && x.noClasse != 2);
        });
        this.totalExploitation = this.service.computeTotalBilan(this.classesExploitation);
    }
    /**
     * Zoom in Bilan -> Classe
     * @param e
     * @param dataItem
     */
    classeZoomInClick(e, dataItem) {
        this.classeSelect = dataItem;
        this.sort = [{
                field: 'noGroupe',
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
                field: 'noSousGroupe',
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
                field: 'noGroupe',
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
                field: 'noCompte',
                dir: 'asc'
            }];
        this.sortComptesChange(this.sort);
        this.statusWindows = StatusWindows.SousGroupe;
    }
    /**
     * Zoom out Sous-groupe -> Groupe
     */
    sousGroupeZoomOutClick() {
        this.statusWindows = StatusWindows.Groupe;
        this.sort = [{
                field: 'noSousGroupe',
                dir: 'asc'
            }];
        this.sortSousGroupesChange(this.sort);
    }
    compteZoomInClick(e, dataItem) {
        this.service.getEcritures(dataItem.noCompte).subscribe((res) => {
            this.selectionEcritures = this.service.computeEcriture(res);
            this.compteSelect = dataItem;
            this.sort = [{
                    field: 'dateEcriture',
                    dir: 'asc'
                }];
            this.sortEcrituresChange(this.sort);
            this.statusWindows = StatusWindows.Compte;
        }, error => {
            this.selectionEcritures = this.service.computeEcriture(new Array());
            this.compteSelect = dataItem;
            this.sort = [{
                    field: 'dateEcriture',
                    dir: 'asc'
                }];
            this.sortEcrituresChange(this.sort);
            this.statusWindows = StatusWindows.Compte;
            this.snackBar.open('Erreur lors du chargement du compte ' + dataItem.noCompte, 'Erreur Http', {
                duration: 7000,
                panelClass: ['error-snackbar']
            });
        });
    }
    /**
     * Zoom out Compte -> Sous-Groupe
     */
    compteZoomOutClick() {
        this.statusWindows = StatusWindows.SousGroupe;
        this.sort = [{
                field: 'noCompte',
                dir: 'asc'
            }];
        // this.sortEcrituresChange(this.sort);
        this.sortComptesChange(this.sort);
    }
    /**
     * Zoom in Détail du compte
     * @param e
     * @param dataItem
     */
    compteDetailZoomInClick(e, dataItem) {
        this.ecritureSelect = dataItem;
        if (dataItem.swEcritureCollective == dataItem.swEcritureCollective) {
            this.service.getEcrituresCollective(dataItem.noEcritureCollective).subscribe((res) => {
                this.selectionEcrituresCollective = this.service.computeEcritureCollective(res);
                this.ecritureCollectiveMontant = this.service.computeEcritureCollectiveMontant(res);
                this.sort = [{
                        field: 'noEcriture',
                        dir: 'desc'
                    }];
                this.sortEcrituresCollectiveChange(this.sort);
            }, error => {
                this.selectionEcrituresCollective = this.service.computeEcritureCollective(new Array());
                this.ecritureCollectiveMontant = this.service.computeEcritureCollectiveMontant(new Array());
                this.sort = [{
                        field: 'noEcriture',
                        dir: 'desc'
                    }];
                this.sortEcrituresCollectiveChange(this.sort);
                this.snackBar.open('Erreur lors du chargement de l\'écr. coll. ' + dataItem.noEcritureCollective, 'Erreur Http', {
                    duration: 7000,
                    panelClass: ['error-snackbar']
                });
            });
        }
        this.statusWindows = StatusWindows.DetailCompte;
    }
    /**
     * Zoom out Détail compte -> Compte
     */
    compteDetailZoomOutClick() {
        this.statusWindows = StatusWindows.Compte;
        this.sort = [{
                field: 'dateEcriture',
                dir: 'asc'
            }];
        this.sortEcrituresChange(this.sort);
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
    /**
     * Tri - Ecritures
     * @param sort
     */
    sortEcrituresChange(sort) {
        this.sort = sort;
        this.gridView = {
            data: orderBy(this.selectionEcritures, this.sort),
            total: this.selectionEcritures.length
        };
    }
    /**
     * Tri - Ecritures
     * @param sort
     */
    sortEcrituresCollectiveChange(sort) {
        this.sortEcrituresCollective = sort;
        this.gridViewEcrituresCollective = {
            data: orderBy(this.selectionEcrituresCollective, this.sortEcrituresCollective),
            total: this.selectionEcrituresCollective.length
        };
    }
};
BilanEcranComponent = __decorate([
    Component({
        selector: 'app-bilan-ecran',
        templateUrl: './bilan-ecran.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [AppSettings,
        ActivatedRoute,
        TGC001BilanService,
        MatSnackBar])
], BilanEcranComponent);
export { BilanEcranComponent };
//# sourceMappingURL=bilan-ecran.component.js.map