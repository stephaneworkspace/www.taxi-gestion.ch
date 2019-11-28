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
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
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
