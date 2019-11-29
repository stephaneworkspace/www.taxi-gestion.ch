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
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({
  selector : 'app-datepicker',
  templateUrl : './datepicker.component.html',
  styleUrls : [ './datepicker.component.scss' ]
})
export class DatepickerComponent {
  private settings: Settings;
  // Datepicker input and change events
  public events: string[] = [];
  // Datepicker start date
  public startDate = new Date(1990, 0, 1);
  // Datepicker with min & max validation
  public minDate = new Date(2010, 0, 1);
  public maxDate = new Date(2020, 0, 1);
  // Datepicker with filter validation
  private myFilter = (d: Date):
      boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      }

  public constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }
  public addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}
