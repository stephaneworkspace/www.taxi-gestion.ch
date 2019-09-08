var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { MenuService } from '../menu.service';
import { MatMenuTrigger } from '@angular/material';
let HorizontalMenuComponent = class HorizontalMenuComponent {
    constructor(appSettings, menuService, router) {
        this.appSettings = appSettings;
        this.menuService = menuService;
        this.router = router;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.menuItems = this.menuService.getHorizontalMenuItems();
        this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
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
};
__decorate([
    Input('menuParentId'),
    __metadata("design:type", Object)
], HorizontalMenuComponent.prototype, "menuParentId", void 0);
__decorate([
    ViewChild(MatMenuTrigger, { static: false }),
    __metadata("design:type", MatMenuTrigger)
], HorizontalMenuComponent.prototype, "trigger", void 0);
HorizontalMenuComponent = __decorate([
    Component({
        selector: 'app-horizontal-menu',
        templateUrl: './horizontal-menu.component.html',
        styleUrls: ['./horizontal-menu.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    __metadata("design:paramtypes", [AppSettings, MenuService, Router])
], HorizontalMenuComponent);
export { HorizontalMenuComponent };
//# sourceMappingURL=horizontal-menu.component.js.map