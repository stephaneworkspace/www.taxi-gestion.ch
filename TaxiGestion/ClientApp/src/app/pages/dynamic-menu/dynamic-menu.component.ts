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
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {debounceTime} from 'rxjs/operators';

import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {Menu} from '../../theme/components/menu/menu.model';
import {MenuService} from '../../theme/components/menu/menu.service';
import {
  VerticalMenuComponent
} from '../../theme/components/menu/vertical-menu/vertical-menu.component';
import {listTransition} from '../../theme/utils/app-animation';

import {DynamicMenuService} from './dynamic-menu.service';

@Component({
  selector : 'app-dynamic-menu',
  templateUrl : './dynamic-menu.component.html',
  providers : [ DynamicMenuService, MenuService ],
  animations : [ listTransition ],
  host : {'[@listTransition]' : ''} // tslint:disable-line
})
export class DynamicMenuComponent implements OnInit, AfterViewInit {
  private settings: Settings;
  private menuItems: Array<Menu>;
  private icons = [
    'home', 'person', 'card_travel', 'delete', 'event', 'favorite', 'help'
  ];
  private form: FormGroup;
  public constructor(private appSettings: AppSettings,
                     private formBuilder: FormBuilder,
                     private snackBar: MatSnackBar,
                     private menuService: MenuService,
                     private dynamicMenuService: DynamicMenuService) {
    this.settings = this.appSettings.settings;
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      title : [
        '', Validators.compose([ Validators.required, Validators.minLength(3) ])
      ],
      icon : null,
      routerLink : [ '', Validators.required ],
      href : [ '', Validators.required ],
      target : null,
      haasSubMenu : false,
      parentId : 0
    });
  }

  public ngAfterViewInit() {
    const HREF = 'href';
    const TARGET = 'target';
    const ROUTER_LINK = 'routerLink';
    const HAS_SUB_MENU = 'hasSubMenu';
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((menu: Menu) => {
      if (menu.routerLink && menu.routerLink !== '') {
        this.form.controls[HREF].setValue(null);
        this.form.controls[HREF].disable();
        this.form.controls[HREF].clearValidators();
        this.form.controls[TARGET].setValue(null);
        this.form.controls[TARGET].disable();
      } else {
        this.form.controls[HREF].enable();
        this.form.controls[HREF].setValidators([ Validators.required ]);
        this.form.controls[TARGET].enable();
      }
      this.form.controls[HREF].updateValueAndValidity();

      if (menu.href && menu.href !== '') {
        this.form.controls[ROUTER_LINK].setValue(null);
        this.form.controls[ROUTER_LINK].disable();
        this.form.controls[ROUTER_LINK].clearValidators();
        this.form.controls[HAS_SUB_MENU].setValue(false);
        this.form.controls[HAS_SUB_MENU].disable();
      } else {
        this.form.controls[ROUTER_LINK].enable();
        this.form.controls[ROUTER_LINK].setValidators([ Validators.required ]);
        this.form.controls[HAS_SUB_MENU].enable();
      }
      this.form.controls[ROUTER_LINK].updateValueAndValidity();
    });
  }

  private onSubmit(menu: Menu): void {
    if (this.form.valid) {
      this.dynamicMenuService.addNewMenuItem(VerticalMenuComponent,
                                             this.menuItems, menu);
      this.snackBar.open('New menu item added successfully!', null, {
        duration : 2000,
      });
      this.form.reset({hasSubMenu : false, parentId : 0});
    }
  }
}
