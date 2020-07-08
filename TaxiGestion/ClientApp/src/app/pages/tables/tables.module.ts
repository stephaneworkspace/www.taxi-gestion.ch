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
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {GridModule} from '@progress/kendo-angular-grid';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {
  ComptabiliteBilanEcranResolver
} from 'src/app/_resolver/comptabilite/bilan-ecran.resolver';
import {SharedModule} from '../../shared/shared.module';
import {BasicComponent} from './basic/basic.component';
import {FilteringComponent} from './filtering/filtering.component';
import {NgxTableComponent} from './ngx-table/ngx-table.component';
import {PagingComponent} from './paging/paging.component';
import {SelectingComponent} from './selecting/selecting.component';
import {SortingComponent} from './sorting/sorting.component';
import {TablesService} from './tables.service';

export const routes = [
  {path : '', redirectTo : 'basic', pathMatch : 'full'},
  {
    path : 'basic',
    component : BasicComponent,
    data : {breadcrumb : 'Basic table'}
  },
  {
    path : 'paging',
    component : PagingComponent,
    data : {breadcrumb : 'Paging table'}
  },
  {
    path : 'sorting',
    component : SortingComponent,
    data : {breadcrumb : 'Sorting table'},
    resolve : {items : ComptabiliteBilanEcranResolver},
  },
  {
    path : 'filtering',
    component : FilteringComponent,
    data : {breadcrumb : 'Filtering table'}
  },
  {
    path : 'selecting',
    component : SelectingComponent,
    data : {breadcrumb : 'Selecting table'}
  },
  {
    path : 'ngx-table',
    component : NgxTableComponent,
    data : {breadcrumb : 'Ngx datatable'}
  },
];

@NgModule({
  imports : [
    CommonModule, RouterModule.forChild(routes), NgxDatatableModule,
    SharedModule,
    GridModule,   // Kendo UI
    ButtonsModule // Kendo UI
  ],
  declarations : [
    BasicComponent, PagingComponent, SortingComponent, FilteringComponent,
    SelectingComponent, NgxTableComponent
  ],
  providers : [ TablesService ]
})
export class TablesModule {
}
