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
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';

import {Menu} from '../../theme/components/menu/menu.model';
import {
  VerticalMenuComponent
} from '../../theme/components/menu/vertical-menu/vertical-menu.component';

@Injectable()
export class DynamicMenuService {
  public constructor(private componentFactoryResolver: ComponentFactoryResolver,
                     private applicationRef: ApplicationRef,
                     private injector: Injector) {}

  public addNewMenuItem(component: any, menuItems: Array<Menu>, menuItem) {
    const TITLE = 'title';
    const ROUTER_LINK = 'routerLink';
    const HREF = 'href';
    const ICON = 'icon';
    const TARGET = 'target';
    const HAS_SUB_MENU = 'hasSubMenu';
    const PARENT_ID = 'parentId';
    const lastId = menuItems[menuItems.length - 1].id;
    const newMenuItem = new Menu(
        lastId + 1, menuItem[TITLE], menuItem[ROUTER_LINK], menuItem[HREF],
        menuItem[ICON], menuItem[TARGET], menuItem[HAS_SUB_MENU],
        parseInt(menuItem[PARENT_ID])); // tslint:disable-line

    menuItems.push(newMenuItem);
    const item = menuItems.filter(i => i.id === newMenuItem.parentId)[0];
    if (item) {
      item.hasSubMenu = true;
    }

    const componentRef =
        this.componentFactoryResolver.resolveComponentFactory(component).create(
            this.injector);

    this.applicationRef.attachView(componentRef.hostView);

    // tslint:disable-next-line
    const instance = <VerticalMenuComponent>componentRef.instance;
    instance.menuItems = menuItems;
    instance.menuParentId = 0;

    const elem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as
                 HTMLElement;

    const verticalMenu = document.getElementById('vertical-menu');
    verticalMenu.replaceChild(elem, verticalMenu.children[0]);
  }
}
