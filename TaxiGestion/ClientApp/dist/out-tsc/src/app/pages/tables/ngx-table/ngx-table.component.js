var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
let NgxTableComponent = class NgxTableComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.editing = {};
        this.rows = [];
        this.temp = [];
        this.selected = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.settings = this.appSettings.settings;
        this.fetch((data) => {
            this.temp = [...data];
            this.rows = data;
            setTimeout(() => { this.loadingIndicator = false; }, 1500);
        });
    }
    fetch(data) {
        const req = new XMLHttpRequest();
        req.open('GET', 'assets/data/company.json');
        req.onload = () => {
            data(JSON.parse(req.response));
        };
        req.send();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
    }
    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
    onActivate(event) {
        console.log('Activate Event', event);
    }
};
__decorate([
    ViewChild(DatatableComponent, { static: true }),
    __metadata("design:type", DatatableComponent)
], NgxTableComponent.prototype, "table", void 0);
NgxTableComponent = __decorate([
    Component({
        selector: 'app-ngx-table',
        templateUrl: './ngx-table.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings])
], NgxTableComponent);
export { NgxTableComponent };
//# sourceMappingURL=ngx-table.component.js.map