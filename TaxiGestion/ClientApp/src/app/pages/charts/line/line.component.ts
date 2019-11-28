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
import {Component} from '@angular/core';

import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {multi, single} from '../charts.data';

@Component({selector : 'app-line', templateUrl : './line.component.html'})
export class LineComponent {
  private single: any[];
  private multi: any[];
  private showXAxis = true;
  private showYAxis = true;
  private gradient = false;
  private showLegend = false;
  private showXAxisLabel = true;
  private xAxisLabel = 'Year';
  private showYAxisLabel = true;
  private yAxisLabel = 'Population';
  private colorScheme = {
    domain :
        [ '#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060' ]
  };
  private autoScale = true;
  private settings: Settings;

  public constructor(private appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    Object.assign(this, {single, multi});
  }

  private onSelect(event) { console.log(event); }
}
