var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { MenuService } from '../menu.service';
let VerticalMenuComponent = class VerticalMenuComponent {
    constructor(appSettings, menuService, router) {
        this.appSettings = appSettings;
        this.menuService = menuService;
        this.router = router;
        this.onClickMenuItem = new EventEmitter();
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);
    }
    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.settings.fixedHeader) {
                    let mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.scrollTop = 0;
                    }
                }
                else {
                    document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
                }
            }
        });
    }
    onClick(menuId) {
        this.menuService.toggleMenuItem(menuId);
        this.menuService.closeOtherSubMenus(this.menuItems, menuId);
        this.onClickMenuItem.emit(menuId);
    }
};
__decorate([
    Input('menuItems'),
    __metadata("design:type", Object)
], VerticalMenuComponent.prototype, "menuItems", void 0);
__decorate([
    Input('menuParentId'),
    __metadata("design:type", Object)
], VerticalMenuComponent.prototype, "menuParentId", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], VerticalMenuComponent.prototype, "onClickMenuItem", void 0);
VerticalMenuComponent = __decorate([
    Component({
        selector: 'app-vertical-menu',
        templateUrl: './vertical-menu.component.html',
        styleUrls: ['./vertical-menu.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    __metadata("design:paramtypes", [AppSettings, MenuService, Router])
], VerticalMenuComponent);
export { VerticalMenuComponent };
//# sourceMappingURL=vertical-menu.component.js.map