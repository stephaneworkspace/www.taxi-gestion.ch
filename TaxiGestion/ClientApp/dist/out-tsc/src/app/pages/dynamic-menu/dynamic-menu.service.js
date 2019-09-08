var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Menu } from '../../theme/components/menu/menu.model';
let DynamicMenuService = class DynamicMenuService {
    constructor(componentFactoryResolver, applicationRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
    }
    addNewMenuItem(component, menuItems, menuItem) {
        const lastId = menuItems[menuItems.length - 1].id;
        const newMenuItem = new Menu(lastId + 1, menuItem['title'], menuItem['routerLink'], menuItem['href'], menuItem['icon'], menuItem['target'], menuItem['hasSubMenu'], parseInt(menuItem['parentId']));
        menuItems.push(newMenuItem);
        let item = menuItems.filter(item => item.id == newMenuItem.parentId)[0];
        if (item)
            item.hasSubMenu = true;
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.applicationRef.attachView(componentRef.hostView);
        let instance = componentRef.instance;
        instance.menuItems = menuItems;
        instance.menuParentId = 0;
        const elem = componentRef.hostView.rootNodes[0];
        const verticalMenu = document.getElementById('vertical-menu');
        verticalMenu.replaceChild(elem, verticalMenu.children[0]);
    }
};
DynamicMenuService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ComponentFactoryResolver,
        ApplicationRef,
        Injector])
], DynamicMenuService);
export { DynamicMenuService };
//# sourceMappingURL=dynamic-menu.service.js.map