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
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SharedModule} from '../../shared/shared.module';
import {BarComponent} from './bar/bar.component';
import {BubbleComponent} from './bubble/bubble.component';
import {LineComponent} from './line/line.component';
import {PieComponent} from './pie/pie.component';

export const routes = [
  {path : '', redirectTo : 'bar', pathMatch : 'full'},
  {path : 'bar', component : BarComponent, data : {breadcrumb : 'Bar Charts'}},
  {path : 'pie', component : PieComponent, data : {breadcrumb : 'Pie Charts'}},
  {
    path : 'line',
    component : LineComponent,
    data : {breadcrumb : 'Line Charts'}
  },
  {
    path : 'bubble',
    component : BubbleComponent,
    data : {breadcrumb : 'Bubble Charts'}
  }
];

@NgModule({
  imports : [
    CommonModule, RouterModule.forChild(routes), NgxChartsModule, SharedModule
  ],
  declarations : [ BarComponent, BubbleComponent, LineComponent, PieComponent ]
})
export class ChartsModule {
}
