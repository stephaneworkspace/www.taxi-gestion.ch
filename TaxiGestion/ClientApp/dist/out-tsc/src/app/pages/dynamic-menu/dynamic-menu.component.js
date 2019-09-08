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
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { MenuService } from '../../theme/components/menu/menu.service';
import { DynamicMenuService } from './dynamic-menu.service';
import { AppSettings } from '../../app.settings';
import { VerticalMenuComponent } from '../../theme/components/menu/vertical-menu/vertical-menu.component';
import { listTransition } from '../../theme/utils/app-animation';
let DynamicMenuComponent = class DynamicMenuComponent {
    constructor(appSettings, formBuilder, snackBar, menuService, dynamicMenuService) {
        this.appSettings = appSettings;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.menuService = menuService;
        this.dynamicMenuService = dynamicMenuService;
        this.icons = ['home', 'person', 'card_travel', 'delete', 'event', 'favorite', 'help'];
        this.settings = this.appSettings.settings;
        this.menuItems = this.menuService.getVerticalMenuItems();
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            'title': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'icon': null,
            'routerLink': ['', Validators.required],
            'href': ['', Validators.required],
            'target': null,
            'hasSubMenu': false,
            'parentId': 0
        });
    }
    ngAfterViewInit() {
        this.form.valueChanges.pipe(debounceTime(500)).subscribe((menu) => {
            if (menu.routerLink && menu.routerLink != '') {
                this.form.controls['href'].setValue(null);
                this.form.controls['href'].disable();
                this.form.controls['href'].clearValidators();
                this.form.controls['target'].setValue(null);
                this.form.controls['target'].disable();
            }
            else {
                this.form.controls['href'].enable();
                this.form.controls['href'].setValidators([Validators.required]);
                this.form.controls['target'].enable();
            }
            this.form.controls['href'].updateValueAndValidity();
            if (menu.href && menu.href != '') {
                this.form.controls['routerLink'].setValue(null);
                this.form.controls['routerLink'].disable();
                this.form.controls['routerLink'].clearValidators();
                this.form.controls['hasSubMenu'].setValue(false);
                this.form.controls['hasSubMenu'].disable();
            }
            else {
                this.form.controls['routerLink'].enable();
                this.form.controls['routerLink'].setValidators([Validators.required]);
                this.form.controls['hasSubMenu'].enable();
            }
            this.form.controls['routerLink'].updateValueAndValidity();
        });
    }
    onSubmit(menu) {
        if (this.form.valid) {
            this.dynamicMenuService.addNewMenuItem(VerticalMenuComponent, this.menuItems, menu);
            this.snackBar.open('New menu item added successfully!', null, {
                duration: 2000,
            });
            this.form.reset({
                hasSubMenu: false,
                parentId: 0
            });
        }
    }
};
DynamicMenuComponent = __decorate([
    Component({
        selector: 'app-dynamic-menu',
        templateUrl: './dynamic-menu.component.html',
        providers: [DynamicMenuService, MenuService],
        animations: [listTransition],
        host: {
            '[@listTransition]': ''
        }
    }),
    __metadata("design:paramtypes", [AppSettings,
        FormBuilder,
        MatSnackBar,
        MenuService,
        DynamicMenuService])
], DynamicMenuComponent);
export { DynamicMenuComponent };
//# sourceMappingURL=dynamic-menu.component.js.map