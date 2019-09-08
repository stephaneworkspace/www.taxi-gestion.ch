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
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { TablesService } from '../tables.service';
let PagingComponent = class PagingComponent {
    constructor(appSettings, tablesService) {
        this.appSettings = appSettings;
        this.tablesService = tablesService;
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.settings = this.appSettings.settings;
        this.dataSource = new MatTableDataSource(this.tablesService.getData());
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
};
__decorate([
    ViewChild(MatPaginator, { static: true }),
    __metadata("design:type", MatPaginator)
], PagingComponent.prototype, "paginator", void 0);
PagingComponent = __decorate([
    Component({
        selector: 'app-paging',
        templateUrl: './paging.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings, TablesService])
], PagingComponent);
export { PagingComponent };
//# sourceMappingURL=paging.component.js.map