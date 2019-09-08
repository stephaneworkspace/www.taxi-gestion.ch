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
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../app.settings';
import { TGC001BilanService } from '../../../_services/TGC001BilanService';
let SaisieEcrituresComponent = class SaisieEcrituresComponent {
    /*
      public items: Dto[];
      public classes: Classe[];
      public totalBilan: Bilan;
      public classesBilan: Classe[];
      public totalExploitation: Bilan;
      public classesExploitation: Classe[];*/
    // Groupe / Sous Groupe
    /*
    public classeSelect: Classe;
    public groupeSelect: Groupe;
    public sousGroupeSelect: SousGroupe;
    public gridView: GridDataResult;
    public sort: SortDescriptor[] = [{
      field: 'id',
      dir: 'asc'
    }];
    public allowUnsort = true;
  
    public settings: Settings;*/
    constructor(appSettings, route, servirce) {
        this.appSettings = appSettings;
        this.route = route;
        this.servirce = servirce;
        //this.settings = this.appSettings.settings; 
    }
    ngOnInit() {
        /*this.route.data.subscribe(data => {
          this.items = data['items'];
          this.loadClasses();
        });*/
    }
    btnClickNouvelleEcritureSimple() {
    }
    btnClickNouvelleEcritureCollective() {
    }
    btnClickEffacerTout() {
    }
};
SaisieEcrituresComponent = __decorate([
    Component({
        selector: 'app-saisie-ecritures',
        templateUrl: './saisie-ecritures.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings,
        ActivatedRoute,
        TGC001BilanService])
], SaisieEcrituresComponent);
export { SaisieEcrituresComponent };
//# sourceMappingURL=saisie-ecritures.component.js.map