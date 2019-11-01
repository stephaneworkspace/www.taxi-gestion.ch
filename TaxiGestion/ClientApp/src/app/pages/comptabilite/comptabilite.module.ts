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
import { JournaliserComponent } from './journaliser/journaliser.component';
import { InputNoCompteFormField } from 'src/app/_modules/form-field/input/no-compte/input-no-compte.component';
import { InputMontantFormField } from 'src/app/_modules/form-field/input/montant/input-montant.component';
import { InputLibelleFormField } from 'src/app/_modules/form-field/input/libelle/input-libelle.component';
import { InputDateEcritureFormField } from 'src/app/_modules/form-field/input/date-ecriture/input-date-ecriture.component';
import { InputPieceFormField } from 'src/app/_modules/form-field/input/piece/input-piece.component';
import { DialogPeriodeComptaDialog } from '../dashboard/dialog/dialog-periode-compta';
import { InputDateExerciceComptFormFieldComponent } from 'src/app/_modules/form-field/input/date-exercice-compta/input-date-exercice-compta.component';
import { ConfigResolver } from 'src/app/_resolver/config/config.resolver';

export const routes = [
  { path: '', redirectTo: 'bilan-ecran', pathMatch: 'full'},
  {
    path: 'bilan-ecran',
    component: BilanEcranComponent,
    data: { breadcrumb: 'Bilan situation à l\'écran' },
    resolve: {
      config: ConfigResolver,
      items: ComptabiliteBilanEcranResolver
    }
  },
  {
    path: 'saisie-ecritures',
    component: SaisieEcrituresComponent,
    data: { breadcrumb: 'Saisie d\'écritures'},
    resolve: {
      config: ConfigResolver,
      ecritures : ComptabiliteListeEcrituresResolver
    }
  },
  {
    path: 'saisie-ecriture-simple',
    component: SimpleComponent,
    data: {
      breadcrumb: 'Saisie d\'écriture simple'
    },
    resolve: {
      config: ConfigResolver,
      planComptable: ComptabilitePlanComptableResolver
    }
  },
  {
    path: 'journaliser-ecritures',
    component: JournaliserComponent, data: {
      breadcrumb: 'Journaliser écritures'
    },
    resolve: {
      config: ConfigResolver,
      ecritures : ComptabiliteListeEcrituresResolver
    }
  }
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
    SimpleComponent,
    JournaliserComponent,
    InputNoCompteFormField,
    InputMontantFormField,
    InputLibelleFormField,
    InputDateEcritureFormField,
    InputPieceFormField,
    DialogPeriodeComptaDialog,
    InputDateExerciceComptFormFieldComponent
  ],
  entryComponents: [
    DialogPeriodeComptaDialog
  ]
})
export class ComptabiliteModule { }
