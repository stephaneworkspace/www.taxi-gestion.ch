var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { AppSettings } from '../app.settings';
import { MenuService } from '../theme/components/menu/menu.service';
let PagesComponent = class PagesComponent {
    constructor(appSettings, router, menuService) {
        this.appSettings = appSettings;
        this.router = router;
        this.menuService = menuService;
        this.menus = ['vertical', 'horizontal'];
        this.menuTypes = ['default', 'compact', 'mini'];
        this.lastScrollTop = 0;
        this.showBackToTop = false;
        this.toggleSearchBar = false;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        if (localStorage.getItem('token') != '') {
        }
        else {
            this.router.navigate(['/login']);
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
    ngAfterViewInit() {
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
        if (this.settings.menu == "vertical")
            this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
    }
    chooseMenu() {
        this.settings.menu = this.menuOption;
        this.defaultMenu = this.menuOption;
        this.router.navigate(['/']);
    }
    chooseMenuType() {
        this.settings.menuType = this.menuTypeOption;
    }
    changeTheme(theme) {
        this.settings.theme = theme;
    }
    toggleSidenav() {
        this.sidenav.toggle();
    }
    onPsScrollY(event) {
        (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
        if (this.settings.menu == 'horizontal') {
            if (this.settings.fixedHeader) {
                var currentScrollTop = (event.target.scrollTop > 56) ? event.target.scrollTop : 0;
                if (currentScrollTop > this.lastScrollTop) {
                    document.querySelector('#horizontal-menu').classList.add('sticky');
                    event.target.classList.add('horizontal-menu-hidden');
                }
                else {
                    document.querySelector('#horizontal-menu').classList.remove('sticky');
                    event.target.classList.remove('horizontal-menu-hidden');
                }
                this.lastScrollTop = currentScrollTop;
            }
            else {
                if (event.target.scrollTop > 56) {
                    document.querySelector('#horizontal-menu').classList.add('sticky');
                    event.target.classList.add('horizontal-menu-hidden');
                }
                else {
                    document.querySelector('#horizontal-menu').classList.remove('sticky');
                    event.target.classList.remove('horizontal-menu-hidden');
                }
            }
        }
    }
    scrollToTop() {
        this.pss.forEach(ps => {
            if (ps.elementRef.nativeElement.id == 'main' || ps.elementRef.nativeElement.id == 'main-content') {
                ps.scrollToTop(0, 250);
            }
        });
    }
    onWindowResize() {
        if (window.innerWidth <= 768) {
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
            this.settings.menu = 'vertical';
        }
        else {
            (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical';
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
    }
    closeSubMenus() {
        let menu = document.querySelector(".sidenav-menu-outer");
        if (menu) {
            for (let i = 0; i < menu.children[0].children.length; i++) {
                let child = menu.children[0].children[i];
                if (child) {
                    if (child.children[0].classList.contains('expanded')) {
                        child.children[0].classList.remove('expanded');
                        child.children[1].classList.remove('show');
                    }
                }
            }
        }
    }
};
__decorate([
    ViewChild('sidenav', { static: false }),
    __metadata("design:type", Object)
], PagesComponent.prototype, "sidenav", void 0);
__decorate([
    ViewChild('backToTop', { static: true }),
    __metadata("design:type", Object)
], PagesComponent.prototype, "backToTop", void 0);
__decorate([
    ViewChildren(PerfectScrollbarDirective),
    __metadata("design:type", QueryList)
], PagesComponent.prototype, "pss", void 0);
__decorate([
    HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PagesComponent.prototype, "onWindowResize", null);
PagesComponent = __decorate([
    Component({
        selector: 'app-pages',
        templateUrl: './pages.component.html',
        styleUrls: ['./pages.component.scss'],
        providers: [MenuService]
    }),
    __metadata("design:paramtypes", [AppSettings, Router, MenuService])
], PagesComponent);
export { PagesComponent };
//# sourceMappingURL=pages.component.js.map