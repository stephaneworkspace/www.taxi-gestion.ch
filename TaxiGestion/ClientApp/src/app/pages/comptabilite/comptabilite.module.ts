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
import { SimpleComponent } from './saisie-ecritures/simple/simple.component';
import { ComptabilitePlanComptableResolver } from 'src/app/_resolver/comptabilite/plan-comptable.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComptabiliteListeEcrituresResolver } from 'src/app/_resolver/comptabilite/liste-ecritures-journal.resolver';

export const routes = [
  { path: '', redirectTo: 'bilan-ecran', pathMatch: 'full'},
  { path: 'bilan-ecran', component: BilanEcranComponent, data: { breadcrumb: 'Bilan situation à l\'écran' }, resolve: { items: ComptabiliteBilanEcranResolver } },
  { path: 'saisie-ecritures', component: SaisieEcrituresComponent, data: { breadcrumb: 'Saisie d\'écritures'}, resolve: { ecritures : ComptabiliteListeEcrituresResolver } },
  { path: 'saisie-ecriture-simple', component: SimpleComponent, data: { breadcrumb: 'Saisie d\'écriture simple'}, resolve: { planComptable: ComptabilitePlanComptableResolver } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedModule,
    GridModule, // Kendo UI
    ButtonsModule, // Kendo UI
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BilanEcranComponent, 
    SaisieEcrituresComponent,
    SimpleComponent
  ],
  providers: [
  ]
})
export class ComptabiliteModule { }
