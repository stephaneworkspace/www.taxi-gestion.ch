import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { BasicComponent } from './basic/basic.component';
import { PagingComponent } from './paging/paging.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilteringComponent } from './filtering/filtering.component';
import { SelectingComponent } from './selecting/selecting.component';
import { NgxTableComponent } from './ngx-table/ngx-table.component';
import { TablesService } from './tables.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { ComptabiliteBilanEcranResolver } from 'src/app/_resolver/comptabilite/bilan-ecran.resolver';

export const routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full'},
  { path: 'basic', component: BasicComponent, data: { breadcrumb: 'Basic table' } },
  { path: 'paging', component: PagingComponent, data: { breadcrumb: 'Paging table' } },
  { path: 'sorting', component: SortingComponent, data: { breadcrumb: 'Sorting table' } , resolve: { items: ComptabiliteBilanEcranResolver }, },
  { path: 'filtering', component: FilteringComponent, data: { breadcrumb: 'Filtering table' } },  
  { path: 'selecting', component: SelectingComponent, data: { breadcrumb: 'Selecting table' } },
  { path: 'ngx-table', component: NgxTableComponent, data: { breadcrumb: 'Ngx datatable' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedModule,
    GridModule, // Kendo UI
    ButtonsModule // Kendo UI
  ],
  declarations: [
    BasicComponent, 
    PagingComponent, 
    SortingComponent, 
    FilteringComponent,
    SelectingComponent, 
    NgxTableComponent
  ],
  providers: [
    TablesService
  ]
})
export class TablesModule { }
