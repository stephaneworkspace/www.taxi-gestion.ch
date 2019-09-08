var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { AppSettings } from '../../app.settings';
import { Subject } from 'rxjs';
import { blockTransition } from '../../theme/utils/app-animation';
const colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
let ScheduleComponent = class ScheduleComponent {
    constructor(appSettings, dialog, snackBar) {
        this.appSettings = appSettings;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.actions = [{
                label: '<i class="material-icons icon-sm white">edit</i>',
                onClick: ({ event }) => {
                    this.openScheduleDialog(event);
                }
            }, {
                label: '<i class="material-icons icon-sm white">close</i>',
                onClick: ({ event }) => {
                    this.events = this.events.filter(iEvent => iEvent !== event);
                    this.snackBar.open('Event deleted successfully!', null, {
                        duration: 1500
                    });
                }
            }];
        this.events = [{
                start: subDays(startOfDay(new Date()), 1),
                end: addDays(new Date(), 1),
                title: 'A 3 day event',
                color: colors.red,
                actions: this.actions
            }, {
                start: startOfDay(new Date()),
                title: 'An event with no end date',
                color: colors.yellow,
                actions: this.actions
            }, {
                start: subDays(endOfMonth(new Date()), 3),
                end: addDays(endOfMonth(new Date()), 3),
                title: 'A long event that spans 2 months',
                color: colors.blue
            }, {
                start: addHours(startOfDay(new Date()), 2),
                end: new Date(),
                title: 'A draggable and resizable event',
                color: colors.yellow,
                actions: this.actions,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            }];
        this.refresh = new Subject();
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
    }
    dayClicked({ date, events }) {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }
    openScheduleDialog(event) {
        let dialogRef = this.dialog.open(ScheduleDialogComponent, {
            data: event
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (!result.isEdit) {
                    result.color = colors.blue;
                    result.actions = this.actions;
                    this.events.push(result);
                    this.refresh.next();
                }
                else {
                    //implement edit here
                }
            }
        });
    }
};
ScheduleComponent = __decorate([
    Component({
        selector: 'app-schedule',
        templateUrl: './schedule.component.html',
        animations: [blockTransition],
        host: {
            '[@blockTransition]': ''
        }
    }),
    __metadata("design:paramtypes", [AppSettings,
        MatDialog,
        MatSnackBar])
], ScheduleComponent);
export { ScheduleComponent };
//# sourceMappingURL=schedule.component.js.map