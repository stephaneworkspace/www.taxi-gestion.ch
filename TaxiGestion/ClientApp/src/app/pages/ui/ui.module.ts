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
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ButtonsComponent} from './buttons/buttons.component';
import {CardsComponent} from './cards/cards.component';
import {ChipsComponent} from './chips/chips.component';
import {
  DialogComponent,
  DialogOverviewExampleDialog
} from './dialog/dialog.component';
import {
  ExpansionPanelComponent
} from './expansion-panel/expansion-panel.component';
import {GridsComponent} from './grids/grids.component';
import {ListsComponent} from './lists/lists.component';
import {ProgressComponent} from './progress/progress.component';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {TabsComponent} from './tabs/tabs.component';
import {TooltipComponent} from './tooltip/tooltip.component';

export const routes = [
  {path : '', redirectTo : 'buttons', pathMatch : 'full'}, {
    path : 'buttons',
    component : ButtonsComponent,
    data : {breadcrumb : 'Buttons'}
  },
  {path : 'cards', component : CardsComponent, data : {breadcrumb : 'Cards'}},
  {path : 'lists', component : ListsComponent, data : {breadcrumb : 'Lists'}},
  {path : 'grids', component : GridsComponent, data : {breadcrumb : 'Grids'}},
  {path : 'tabs', component : TabsComponent, data : {breadcrumb : 'Tabs'}}, {
    path : 'expansion-panel',
    component : ExpansionPanelComponent,
    data : {breadcrumb : 'Expansion Panel'}
  },
  {path : 'chips', component : ChipsComponent, data : {breadcrumb : 'Chips'}}, {
    path : 'progress',
    component : ProgressComponent,
    data : {breadcrumb : 'Progress'}
  },
  {
    path : 'dialog',
    component : DialogComponent,
    data : {breadcrumb : 'Dialog'}
  },
  {
    path : 'tooltip',
    component : TooltipComponent,
    data : {breadcrumb : 'Tooltip'}
  },
  {
    path : 'snack-bar',
    component : SnackBarComponent,
    data : {breadcrumb : 'Snackbar'}
  }
];

@NgModule({
  imports : [
    CommonModule, RouterModule.forChild(routes), FormsModule, SharedModule
  ],
  declarations : [
    ButtonsComponent, CardsComponent, ListsComponent, GridsComponent,
    TabsComponent, ExpansionPanelComponent, ChipsComponent, ProgressComponent,
    TooltipComponent, DialogComponent, DialogOverviewExampleDialog,
    SnackBarComponent
  ],
  entryComponents : [ DialogOverviewExampleDialog ]
})
export class UiModule {
}
