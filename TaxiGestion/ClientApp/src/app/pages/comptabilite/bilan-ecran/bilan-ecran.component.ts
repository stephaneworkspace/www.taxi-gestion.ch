import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { TGC001BilanService, Bilan, Classe, Groupe, SousGroupe, Compte, Ecriture, EcritureCollective, EcritureCollectiveMontant } from '../../../_services/TGC001BilanService'
import { DtoTGC001OutDC10CompteForList as DtoDC10 } from 'src/app/_dto/TGC/DtoTGC001OutDC10CompteForList';
import { DtoTGC001OutDC21EcritureForList as DtoDC21 } from 'src/app/_dto/TGC/DtoTGC001OutDC21EcritureForList';
import { DtoTGC001OutDC21EcritureForListColl as DtoDC21Coll } from 'src/app/_dto/TGC/DtoTGC001OutDC21EcritureForListColl';

import { MatSnackBar } from '@angular/material';

export enum StatusWindows {
  Bilan,
  Classe,
  Groupe,
  SousGroupe,
  Compte,
  DetailCompte
}

@Component({
  selector: 'app-bilan-ecran',
  templateUrl: './bilan-ecran.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BilanEcranComponent implements OnInit {
  public statusWindows: StatusWindows;
  StatusWindows : typeof StatusWindows = StatusWindows;

  public items: DtoDC10[];
  public classes: Classe[];
  public totalBilan: Bilan;
  public classesBilan: Classe[];
  public totalExploitation: Bilan;
  public classesExploitation: Classe[];
  public selectionEcritures: Ecriture[];
  public selectionEcrituresCollective: EcritureCollective[];

  // Groupe / Sous Groupe
  public classeSelect: Classe;
  public groupeSelect: Groupe;
  public sousGroupeSelect: SousGroupe;
  public compteSelect: Compte;
  public ecritureSelect: Ecriture;
  public ecritureCollectiveMontant: EcritureCollectiveMontant;
  public gridView: GridDataResult;
  public gridViewEcrituresCollective: GridDataResult;
  public sort: SortDescriptor[] = [{
    field: 'noClasse',
    dir: 'asc'
  }];
  public sortEcrituresCollective: SortDescriptor[] = [{
    field: 'noEcriture',
    dir: 'asc'
  }];
  public allowUnsort = true;

  public settings: Settings;

  constructor(
    public appSettings:AppSettings, 
    private route: ActivatedRoute,
    private service: TGC001BilanService,
    public snackBar: MatSnackBar
  ) {
    this.settings = this.appSettings.settings; 
 }

  ngOnInit(): void {
    this.statusWindows = StatusWindows["Bilan"];
    this.route.data.subscribe(data => {
      this.items = data['items'];
      this.loadClasses();
    });
  }

  btnClickRafraichir(): void {
    this.service.getPlanComptable().subscribe((res: DtoDC10[]) => {
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
  private loadClasses(): void {
      this.classes = new Array();
      this.classes = this.service.computeClasse(this.items);
      this.classesBilan = this.classes.filter((x) => {
        return(x.noClasse == 1 || x.noClasse == 2) 
      });
      this.totalBilan = this.service.computeTotalBilan(this.classesBilan);
      this.classesExploitation = this.classes.filter((x) => {
        return(x.noClasse != 1 && x.noClasse != 2) 
      });
      this.totalExploitation = this.service.computeTotalBilan(this.classesExploitation);
  }

  /**
   * Zoom in Bilan -> Classe
   * @param e 
   * @param dataItem 
   */
  public classeZoomInClick(e: any, dataItem: Classe): void {
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
      field: 'noSousGroupe',
      dir: 'asc'
    }];
    this.sortSousGroupesChange(this.sort)
    this.statusWindows = StatusWindows.Groupe;
  }

  /**
   * Zoom out Groupe -> Classe
   */
  public groupeZoomOutClick(): void {
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
  public sousGroupeZoomInClick(e: any, dataItem: SousGroupe): void {
    this.sousGroupeSelect = dataItem;
    this.sort = [{
      field: 'noCompte',
      dir: 'asc'
    }];
    this.sortComptesChange(this.sort)
    this.statusWindows = StatusWindows.SousGroupe;
  }

  /**
   * Zoom out Sous-groupe -> Groupe
   */
  public sousGroupeZoomOutClick(): void {
    this.statusWindows = StatusWindows.Groupe;
    this.sort = [{
      field: 'noSousGroupe',
      dir: 'asc'
    }];
    this.sortSousGroupesChange(this.sort);
  }

  public compteZoomInClick(e: any, dataItem: Compte): void {
    this.service.getEcritures(dataItem.noCompte).subscribe((res: DtoDC21[]) => {
      this.selectionEcritures = this.service.computeEcriture(res);
      this.compteSelect = dataItem;
      this.sort = [{
        field: 'dateEcriture',
        dir: 'asc'
      }];
      this.sortEcrituresChange(this.sort);
      this.statusWindows = StatusWindows.Compte;
    }, error => {
      this.selectionEcritures = this.service.computeEcriture(new Array())
      this.compteSelect = dataItem;
      this.sort = [{
        field: 'dateEcriture',
        dir: 'asc'
      }];
      this.sortEcrituresChange(this.sort);
      this.statusWindows = StatusWindows.Compte;
      this.snackBar.open('Erreur lors du chargement du compte ' + dataItem.noCompte , 'Erreur Http', {
        duration: 7000,
        panelClass: ['error-snackbar']
      });
    });
  }

  /**
   * Zoom out Compte -> Sous-Groupe
   */
  public compteZoomOutClick(): void {
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
  public compteDetailZoomInClick(e: any, dataItem: Ecriture): void {
    this.ecritureSelect = dataItem;
    if (dataItem.swEcritureCollective == dataItem.swEcritureCollective) {
      this.service.getEcrituresCollective(dataItem.noEcritureCollective).subscribe((res: DtoDC21Coll[]) => {
        this.selectionEcrituresCollective = this.service.computeEcritureCollective(res);
        this.ecritureCollectiveMontant = this.service.computeEcritureCollectiveMontant(res);
        this.sort = [{
          field: 'noEcriture',
          dir: 'desc'
        }];
        this.sortEcrituresCollectiveChange(this.sort);
      }, error => {
        this.selectionEcrituresCollective = this.service.computeEcritureCollective(new Array())
        this.ecritureCollectiveMontant = this.service.computeEcritureCollectiveMontant(new Array());
        this.sort = [{
          field: 'noEcriture',
          dir: 'desc'
        }];
        this.sortEcrituresCollectiveChange(this.sort);
        this.snackBar.open('Erreur lors du chargement de l\'écr. coll. ' + dataItem.noEcritureCollective , 'Erreur Http', {
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
  public compteDetailZoomOutClick(): void {
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

  /**
   * Tri - Ecritures
   * @param sort 
   */
  public sortEcrituresChange(sort: SortDescriptor[]): void {
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
  public sortEcrituresCollectiveChange(sort: SortDescriptor[]): void {
    this.sortEcrituresCollective = sort;
    this.gridViewEcrituresCollective = {
        data: orderBy(this.selectionEcrituresCollective, this.sortEcrituresCollective),
        total: this.selectionEcrituresCollective.length
    };
  }

}