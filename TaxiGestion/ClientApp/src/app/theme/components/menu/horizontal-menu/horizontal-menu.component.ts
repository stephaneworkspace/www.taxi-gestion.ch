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
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';

import {AppSettings} from '../../../../app.settings';
import {Settings} from '../../../../app.settings.model';
import {MenuService} from '../menu.service';

const MENU_PARENT_ID = 'menuParentId';

@Component({
  selector : 'app-horizontal-menu',
  templateUrl : './horizontal-menu.component.html',
  styleUrls : [ './horizontal-menu.component.scss' ],
  encapsulation : ViewEncapsulation.None,
  providers : [ MenuService ]
})
export class HorizontalMenuComponent implements OnInit, AfterViewInit {
  @Input(MENU_PARENT_ID) menuParentId;
  private menuItems: Array<any>;
  private settings: Settings;
  @ViewChild(MatMenuTrigger, {static : false}) trigger: MatMenuTrigger;
  public constructor(private appSettings: AppSettings,
                     private menuService: MenuService, private router: Router) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems =
        this.menuItems.filter(item => item.parentId === this.menuParentId);
  }

  public ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        } else {
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop =
              0;
        }
      }
    });
  }
}
