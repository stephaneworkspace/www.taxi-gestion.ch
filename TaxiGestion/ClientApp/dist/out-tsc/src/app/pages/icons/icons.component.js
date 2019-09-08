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
import { IconsService } from './icons.service';
let IconsComponent = class IconsComponent {
    constructor(appSettings, iconsService) {
        this.appSettings = appSettings;
        this.iconsService = iconsService;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.icons = this.iconsService.getIcons();
    }
};
IconsComponent = __decorate([
    Component({
        selector: 'app-material-icons',
        templateUrl: './icons.component.html',
        providers: [IconsService]
    }),
    __metadata("design:paramtypes", [AppSettings, IconsService])
], IconsComponent);
export { IconsComponent };
//# sourceMappingURL=icons.component.js.map