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
 * This program is free software; the source ode is released under and Creative
 * Commons License.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {MenuService} from '../menu/menu.service';

@Component({
  selector : 'app-sidenav',
  templateUrl : './sidenav.component.html',
  styleUrls : [ './sidenav.component.scss' ],
  encapsulation : ViewEncapsulation.None,
  providers : [ MenuService ]
})
export class SidenavComponent implements OnInit {
  private userImage = '../assets/img/users/user.jpg';
  public menuItems: Array<any>;
  public settings: Settings;
  constructor(private appSettings: AppSettings,
              private menuService: MenuService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() { this.menuItems = this.menuService.getVerticalMenuItems(); }

  public closeSubMenus() {
    const menu = document.getElementById('vertical-menu');
    if (menu) {
      /* tslint:disable-next-line */
      for (let i = 0; i < menu.children[0].children.length; i++) {
        const child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }
}
