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
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { TablesService } from '../tables.service';
let SelectingComponent = class SelectingComponent {
    constructor(tablesService) {
        this.tablesService = tablesService;
        this.displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
        this.selection = new SelectionModel(true, []);
    }
    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.tablesService.getData());
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }
};
SelectingComponent = __decorate([
    Component({
        selector: 'app-selecting',
        templateUrl: './selecting.component.html'
    }),
    __metadata("design:paramtypes", [TablesService])
], SelectingComponent);
export { SelectingComponent };
//# sourceMappingURL=selecting.component.js.map