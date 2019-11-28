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
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays
} from 'date-fns';
import {Subject} from 'rxjs';

import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {blockTransition} from '../../theme/utils/app-animation';

import {
  ScheduleDialogComponent
} from './schedule-dialog/schedule-dialog.component';

const colors: any = {
  red : {primary : '#ad2121', secondary : '#FAE3E3'},
  blue : {primary : '#1e90ff', secondary : '#D1E8FF'},
  yellow : {primary : '#e3bc08', secondary : '#FDF1BA'}
};

@Component({
  selector : 'app-schedule',
  templateUrl : './schedule.component.html',
  animations : [ blockTransition ],
  // tslint:disable-next-line
  host : {'[@blockTransition]' : ''}
})
export class ScheduleComponent implements OnInit {
  private view: string;
  private viewDate: Date = new Date();
  private activeDayIsOpen: boolean;
  private actions: CalendarEventAction[];
  private events: CalendarEvent[];
  private refresh: Subject<any> = new Subject();

  private settings: Settings;

  public constructor(private appSettings: AppSettings,
                     private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.view = 'month';
    this.activeDayIsOpen = true;
    this.actions = [
      {
        label : '<i class="material-icons icon-sm white">edit</i>',
        onClick : ({event}: {event: CalendarEvent}) : // tslint:disable-line
            void => { this.openScheduleDialog(event); }
      },
      {
        label : '<i class="material-icons icon-sm white">close</i>',
        onClick : ({event}: {event: CalendarEvent}) : // tslint:disable-line
            void => {
              this.events = this.events.filter(iEvent => iEvent !== event);
              this.snackBar.open('Event deleted successfully!', null,
                                 {duration : 1500});
            }
      }
    ];
    this.events = [
      {
        start : subDays(startOfDay(new Date()), 1),
        end : addDays(new Date(), 1),
        title : 'A 3 day event',
        color : colors.red,
        actions : this.actions
      },
      {
        start : startOfDay(new Date()),
        title : 'An event with no end date',
        color : colors.yellow,
        actions : this.actions
      },
      {
        start : subDays(endOfMonth(new Date()), 3),
        end : addDays(endOfMonth(new Date()), 3),
        title : 'A long event that spans 2 months',
        color : colors.blue
      },
      {
        start : addHours(startOfDay(new Date()), 2),
        end : new Date(),
        title : 'A draggable and resizable event',
        color : colors.yellow,
        actions : this.actions,
        resizable : {beforeStart : true, afterEnd : true},
        draggable : true
      }
    ];
  }

  private dayClicked({date, events}: {date: Date, events: CalendarEvent[]}):
      void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  private openScheduleDialog(event) {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {data : event});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.isEdit) {
          result.color = colors.blue;
          result.actions = this.actions;
          this.events.push(result);
          this.refresh.next();
        } else {
          // implement edit here
        }
      }
    });
  }
}
