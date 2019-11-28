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
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

import {AppSettings} from '../app.settings';
import {Settings} from '../app.settings.model';
import {MenuService} from '../theme/components/menu/menu.service';

@Component({
  selector : 'app-pages',
  templateUrl : './pages.component.html',
  styleUrls : [ './pages.component.scss' ],
  providers : [ MenuService ]
})
export class PagesComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', {static : false}) sidenav: any;
  @ViewChild('backToTop', {static : true}) backToTop: any;
  @ViewChildren(PerfectScrollbarDirective)
  private pss: QueryList<PerfectScrollbarDirective>;
  private settings: Settings;
  private menus = [ 'vertical', 'horizontal' ];
  private menuOption: string;
  private menuTypes = [ 'default', 'compact', 'mini' ];
  private menuTypeOption: string;
  private lastScrollTop: number;
  private showBackToTop: boolean;
  private toggleSearchBar: boolean;
  private defaultMenu: string; // declared for return def menu when window resi.

  public constructor(private appSettings: AppSettings, private router: Router,
                     private menuService: MenuService) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.lastScrollTop = 0;
    this.showBackToTop = false;
    this.toggleSearchBar = false;
    if (localStorage.getItem('token') !== '') {
    } else {
      this.router.navigate([ '/login' ]);
    }
    if (window.innerWidth <= 768) {
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu;
    this.menuTypeOption = this.settings.menuType;
    this.defaultMenu = this.settings.menu;
  }

  public ngAfterViewInit() {
    setTimeout(() => { this.settings.loadingSpinner = false; }, 300);
    this.backToTop.nativeElement.style.display = 'none';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.settings.sidenavIsPinned) {
          this.sidenav.close();
        }
        if (window.innerWidth <= 768) {
          this.sidenav.close();
        }
      }
    });
    if (this.settings.menu === 'vertical') {
      this.menuService.expandActiveSubMenu(
          this.menuService.getVerticalMenuItems());
    }
  }

  private chooseMenu() {
    this.settings.menu = this.menuOption;
    this.defaultMenu = this.menuOption;
    this.router.navigate([ '/' ]);
  }

  private chooseMenuType() { this.settings.menuType = this.menuTypeOption; }

  private changeTheme(theme) { this.settings.theme = theme; }

  private toggleSidenav() { this.sidenav.toggle(); }

  private onPsScrollY(event) {
    (event.target.scrollTop > 300)
        ? this.backToTop.nativeElement.style.display = 'flex'
        : this.backToTop.nativeElement.style.display = 'none';
    if (this.settings.menu === 'horizontal') {
      if (this.settings.fixedHeader) {
        const currentScrollTop =
            (event.target.scrollTop > 56) ? event.target.scrollTop : 0;
        if (currentScrollTop > this.lastScrollTop) {
          document.querySelector('#horizontal-menu').classList.add('sticky');
          event.target.classList.add('horizontal-menu-hidden');
        } else {
          document.querySelector('#horizontal-menu').classList.remove('sticky');
          event.target.classList.remove('horizontal-menu-hidden');
        }
        this.lastScrollTop = currentScrollTop;
      } else {
        if (event.target.scrollTop > 56) {
          document.querySelector('#horizontal-menu').classList.add('sticky');
          event.target.classList.add('horizontal-menu-hidden');
        } else {
          document.querySelector('#horizontal-menu').classList.remove('sticky');
          event.target.classList.remove('horizontal-menu-hidden');
        }
      }
    }
  }

  private scrollToTop() {
    this.pss.forEach(ps => {
      if (ps.elementRef.nativeElement.id === 'main' ||
          ps.elementRef.nativeElement.id === 'main-content') {
        ps.scrollToTop(0, 250);
      }
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 768) {
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical';
    } else {
      (this.defaultMenu === 'horizontal') ? this.settings.menu = 'horizontal'
                                          : this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
  }

  private closeSubMenus() {
    const menu = document.querySelector('.sidenav-menu-outer');
    if (menu) {
      // tslint:disable-next-line
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
