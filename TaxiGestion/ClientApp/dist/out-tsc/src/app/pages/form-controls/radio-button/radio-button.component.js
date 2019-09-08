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
import { AppSettings } from '../../../app.settings';
let RadioButtonComponent = class RadioButtonComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.seasons = [
            'Winter',
            'Spring',
            'Summer',
            'Autumn',
        ];
        this.settings = this.appSettings.settings;
    }
};
RadioButtonComponent = __decorate([
    Component({
        selector: 'app-radio-button',
        templateUrl: './radio-button.component.html',
        styleUrls: ['./radio-button.component.scss']
    }),
    __metadata("design:paramtypes", [AppSettings])
], RadioButtonComponent);
export { RadioButtonComponent };
//# sourceMappingURL=radio-button.component.js.map