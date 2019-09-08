import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { TGC001BilanService, Bilan, Classe, Groupe, SousGroupe, Compte } from '../../../_services/TGC001BilanService'
import { DtoTGC001OutDC10CompteForList as Dto } from 'src/app/_dto/TGC/DtoTGC001OutDC10CompteForList';



@Component({
  selector: 'app-saisie-ecritures',
  templateUrl: './saisie-ecritures.component.html'
})
export class SaisieEcrituresComponent implements OnInit {

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

  constructor(
    public appSettings:AppSettings, 
    private route: ActivatedRoute,
    private service: TGC001BilanService
  ) {
    //this.settings = this.appSettings.settings; 
 }


  ngOnInit(): void {
    /*this.route.data.subscribe(data => {
      this.items = data['items'];
      this.loadClasses();
    });*/
  }

  btnClickNouvelleEcritureSimple(): void {

  }

  btnClickNouvelleEcritureCollective(): void {

  }

  btnClickEffacerTout(): void {
    
  }
}