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
import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {bubble} from '../charts.data';

@Component({selector : 'app-bubble', templateUrl : './bubble.component.html'})
export class BubbleComponent implements OnInit {
  private bubble: any[];
  private legendTitle = 'Legend';
  private showLegend = true;
  private tooltipDisabled = false;
  private showGridLines = true;
  private roundDomains = false;
  private maxRadius = 10;
  private minRadius = 3;
  private schemeType: string;
  private showXAxis = true;
  private showYAxis = true;
  private showXAxisLabel = true;
  private xAxisLabel = 'Census Date';
  private showYAxisLabel = true;
  private yAxisLabel = 'Life expectancy [years]';
  private colorScheme = {
    domain :
        [ '#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060' ]
  };
  private autoScale = true;
  private settings: Settings;

  public constructor(private appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    Object.assign(this, {bubble});
  }
  public ngOnInit(): void { this.schemeType = 'ordinal'; }

  private onSelect(event) { console.log(event); }
}
