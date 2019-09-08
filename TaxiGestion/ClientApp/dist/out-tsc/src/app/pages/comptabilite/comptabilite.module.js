var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { BilanEcranComponent } from './bilan-ecran/bilan-ecran.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SaisieEcrituresComponent } from './saisie-ecritures/saisie-ecritures.component';
import { ComptabiliteBilanEcranResolver } from 'src/app/_resolver/comptabilite/bilan-ecran.resolver';
export const routes = [
    { path: '', redirectTo: 'bilan-ecran', pathMatch: 'full' },
    { path: 'bilan-ecran', component: BilanEcranComponent, data: { breadcrumb: 'Bilan situation à l\'écran' }, resolve: { items: ComptabiliteBilanEcranResolver }, },
    { path: 'saisie-ecritures', component: SaisieEcrituresComponent, data: { breadcrumb: 'Saisie d\'écritures [Expert]' } }
];
let ComptabiliteModule = class ComptabiliteModule {
};
ComptabiliteModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            NgxDatatableModule,
            SharedModule,
            GridModule,
            ButtonsModule,
        ],
        declarations: [
            BilanEcranComponent,
            SaisieEcrituresComponent
        ],
        providers: []
    })
], ComptabiliteModule);
export { ComptabiliteModule };
//# sourceMappingURL=comptabilite.module.js.map