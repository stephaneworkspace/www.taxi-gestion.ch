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
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {
  User,
  UserContacts,
  UserProfile,
  UserSettings,
  UserSocial,
  UserWork
} from './user.model';
import {UsersService} from './users.service';

@Component({
  selector : 'app-users',
  templateUrl : './users.component.html',
  styleUrls : [ './users.component.scss' ],
  encapsulation : ViewEncapsulation.None,
  providers : [ UsersService ]
})
export class UsersComponent implements OnInit {
  private users: User[];
  private searchText: string;
  private page: any;
  private settings: Settings;
  public constructor(private appSettings: AppSettings,
                     private dialog: MatDialog,
                     private usersService: UsersService) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() { this.getUsers(); }

  private getUsers(): void {
    this.users = null; // for show spinner each time
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  private addUser(u: User) {
    this.usersService.addUser(u).subscribe(user => this.getUsers());
  }

  private updateUser(u: User) {
    this.usersService.updateUser(u).subscribe(user => this.getUsers());
  }

  private deleteUser(u: User) {
    this.usersService.deleteUser(u.id).subscribe(user => this.getUsers());
  }

  private onPageChanged(event) {
    this.page = event;
    this.getUsers();
    if (this.settings.fixedHeader) {
      document.getElementById('main-content').scrollTop = 0;
    } else {
      document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
    }
  }

  private openUserDialog(u) {
    const dialogRef = this.dialog.open(UserDialogComponent, {data : u});

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        (user.id) ? this.updateUser(user) : this.addUser(user);
      }
    });
  }
}
