var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
let UsersComponent = class UsersComponent {
    constructor(appSettings, dialog, usersService) {
        this.appSettings = appSettings;
        this.dialog = dialog;
        this.usersService = usersService;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.users = null; //for show spinner each time
        this.usersService.getUsers().subscribe(users => this.users = users);
    }
    addUser(user) {
        this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    updateUser(user) {
        this.usersService.updateUser(user).subscribe(user => this.getUsers());
    }
    deleteUser(user) {
        this.usersService.deleteUser(user.id).subscribe(user => this.getUsers());
    }
    onPageChanged(event) {
        this.page = event;
        this.getUsers();
        if (this.settings.fixedHeader) {
            document.getElementById('main-content').scrollTop = 0;
        }
        else {
            document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
    }
    openUserDialog(user) {
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: user
        });
        dialogRef.afterClosed().subscribe(user => {
            if (user) {
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
    }
};
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [UsersService]
    }),
    __metadata("design:paramtypes", [AppSettings,
        MatDialog,
        UsersService])
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map