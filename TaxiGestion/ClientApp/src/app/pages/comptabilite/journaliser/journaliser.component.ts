import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { DtoTGC003OutDC30EcritureJournalForListMod as Dto } from 'src/app/_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';
import { TGC002JournalisationService as Service } from 'src/app/_services/TGC002JournalisationService';

import { MatSnackBar } from '@angular/material';
import { TGC003SaisieEcrituresService, EcrituresTotal } from 'src/app/_services/TGC003SaisieEcrituresService';

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

  constructor(
    public appSettings:AppSettings, 
    private route: ActivatedRoute,
    public router: Router,
    private service: Service,
    private serviceEcritures: TGC003SaisieEcrituresService,
    private snackBar: MatSnackBar,
  ) {
    //this.settings = this.appSettings.settings; 
 }

  public pageSize = 10;
  public skip = 0;

  public sliderChange(pageIndex: number): void {
      this.skip = (pageIndex - 1) * this.pageSize;
  }

  public onPageChange(state: any): void {
      this.pageSize = state.take;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.ecritures = this.serviceEcritures.computeListeDesEcritures(data['ecritures']);
      // this.ecritures.reverse(); // pour la saisie d'écriture reserve pour ne pas naviguer entre les pages
      this.ecrituresTotal = this.serviceEcritures.computeTotalEcritures(this.ecritures);
      this.gridView = {
          data: orderBy(this.ecritures, this.sort),
          total: this.ecritures.length
      };
    });
  }

  btnAFaire(): void {
    alert('À faire');
  }

  btnSubmit(): void {
    if (this.ecritures === undefined || this.ecritures.length == 0) {
      this.snackBar.open('Rien à journaliser', 'Comptabilité', {
        duration: 7000,
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