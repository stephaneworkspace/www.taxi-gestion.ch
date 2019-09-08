var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
let DetectScrollDirective = class DetectScrollDirective {
    constructor() {
        this.onScroll = new EventEmitter();
    }
    elementScrolled(event) {
        const scrollTop = event.target.scrollTop;
        const emitValue = { originalEvent: event, isWindowEvent: false, scrollTop };
        this.onScroll.emit(emitValue);
    }
    windowScrolled(event) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const emitValue = { originalEvent: event, isWindowEvent: true, scrollTop };
        this.onScroll.emit(emitValue);
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], DetectScrollDirective.prototype, "onScroll", void 0);
__decorate([
    HostListener('scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DetectScrollDirective.prototype, "elementScrolled", null);
__decorate([
    HostListener('window:scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DetectScrollDirective.prototype, "windowScrolled", null);
DetectScrollDirective = __decorate([
    Directive({
        selector: '[detectScroll]'
    })
], DetectScrollDirective);
export { DetectScrollDirective };
//# sourceMappingURL=detect-scroll.directive.js.map