var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { orders, products, customers, refunds } from '../dashboard.data';
let InfoCardsComponent = class InfoCardsComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.colorScheme = {
            domain: ['#999']
        };
        this.autoScale = true;
        this.previousWidthOfResizedDiv = 0;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.orders = orders;
        this.products = products;
        this.customers = customers;
        this.refunds = refunds;
        this.orders = this.addRandomValue('orders');
        this.customers = this.addRandomValue('customers');
    }
    onSelect(event) {
        console.log(event);
    }
    addRandomValue(param) {
        switch (param) {
            case 'orders':
                for (let i = 1; i < 30; i++) {
                    this.orders[0].series.push({ "name": 1980 + i, "value": Math.ceil(Math.random() * 1000000) });
                }
                return this.orders;
            case 'customers':
                for (let i = 1; i < 15; i++) {
                    this.customers[0].series.push({ "name": 2000 + i, "value": Math.ceil(Math.random() * 1000000) });
                }
                return this.customers;
            default:
                return this.orders;
        }
    }
    ngOnDestroy() {
        this.orders[0].series.length = 0;
        this.customers[0].series.length = 0;
    }
    ngAfterViewChecked() {
        if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
            setTimeout(() => this.orders = [...orders]);
            setTimeout(() => this.products = [...products]);
            setTimeout(() => this.customers = [...customers]);
            setTimeout(() => this.refunds = [...refunds]);
        }
        this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
    }
};
__decorate([
    ViewChild('resizedDiv', { static: true }),
    __metadata("design:type", ElementRef)
], InfoCardsComponent.prototype, "resizedDiv", void 0);
InfoCardsComponent = __decorate([
    Component({
        selector: 'app-info-cards',
        templateUrl: './info-cards.component.html',
        styleUrls: ['./info-cards.component.scss']
    }),
    __metadata("design:paramtypes", [AppSettings])
], InfoCardsComponent);
export { InfoCardsComponent };
//# sourceMappingURL=info-cards.component.js.map