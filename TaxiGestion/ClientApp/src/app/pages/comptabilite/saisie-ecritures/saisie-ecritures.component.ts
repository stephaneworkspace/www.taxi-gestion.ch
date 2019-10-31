import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { DtoTGC003OutDC30EcritureJournalForListMod as Dto } from 'src/app/_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';
import { TGC003SaisieEcrituresService as Service, EcrituresTotal } from 'src/app/_services/TGC003SaisieEcrituresService';

@Component({
  selector: 'app-saisie-ecritures',
  templateUrl: './saisie-ecritures.component.html',
  styleUrls: ['./saisie-ecritures.component.scss']
})
export class SaisieEcrituresComponent implements OnInit {

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
    public appSettings: AppSettings,
    private route: ActivatedRoute,
    public router: Router,
    private service: Service
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
      this.ecritures = this.service.computeListeDesEcritures(data['ecritures']);
      this.ecrituresTotal = this.service.computeTotalEcritures(this.ecritures);
      this.ecritures.reverse();
      this.gridView = {
          data: orderBy(this.ecritures, this.sort),
          total: this.ecritures.length
      };
    });
  }

  btnClickNouvelleEcritureSimple(): void {
    this.router.navigate(['/index/comptabilite/saisie-ecriture-simple'])
  }

  btnClickNouvelleEcritureCollective(): void {
    alert('À faire');
  }

  btnClickEffacerTout(): void {
    alert('À faire');
  }

  aFaire(): void {
    alert('À faire');
  }
}