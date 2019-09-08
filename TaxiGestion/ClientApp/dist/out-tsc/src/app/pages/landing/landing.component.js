var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
let LandingComponent = class LandingComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        localStorage.removeItem('token');
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.settings.rtl = false;
    }
    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }
    scrollToDemos() {
        setTimeout(() => { window.scrollTo(0, 520); });
    }
    changeLayout(menu, menuType, isRtl) {
        this.settings.menu = menu;
        this.settings.menuType = menuType;
        this.settings.rtl = isRtl;
        this.settings.theme = 'indigo-light';
    }
    changeTheme(theme) {
        this.settings.theme = theme;
    }
};
LandingComponent = __decorate([
    Component({
        selector: 'app-landing',
        templateUrl: './landing.component.html',
        styleUrls: ['./landing.component.scss']
    }),
    __metadata("design:paramtypes", [AppSettings])
], LandingComponent);
export { LandingComponent };
//# sourceMappingURL=landing.component.js.map