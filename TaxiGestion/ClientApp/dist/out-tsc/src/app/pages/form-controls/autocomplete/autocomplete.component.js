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
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AppSettings } from '../../../app.settings';
let AutocompleteComponent = class AutocompleteComponent {
    constructor(appSettings) {
        this.appSettings = appSettings;
        this.myControl = new FormControl();
        this.options = [
            'One',
            'Two',
            'Three'
        ];
        this.filteredControl = new FormControl();
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.filteredOptions = this.filteredControl.valueChanges
            .pipe(startWith(''), map(val => this.filter(val)));
    }
    filter(val) {
        return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
};
AutocompleteComponent = __decorate([
    Component({
        selector: 'app-autocomplete',
        templateUrl: './autocomplete.component.html'
    }),
    __metadata("design:paramtypes", [AppSettings])
], AutocompleteComponent);
export { AutocompleteComponent };
//# sourceMappingURL=autocomplete.component.js.map