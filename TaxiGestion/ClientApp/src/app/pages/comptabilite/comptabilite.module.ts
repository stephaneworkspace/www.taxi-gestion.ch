/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {GridModule} from '@progress/kendo-angular-grid';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {
  InputDateEcritureFormFieldComponent
} from 'src/app/_modules/form-field/input/date-ecriture/input.component';
import {
  InputDateExerciceComptFormFieldComponent
} from 'src/app/_modules/form-field/input/date-exercice-compta/input.component';
import {
  InputLibelleFormFieldComponent
} from 'src/app/_modules/form-field/input/libelle/input.component';
import {
  InputMontantFormFieldComponent
} from 'src/app/_modules/form-field/input/montant/input.component';
import {
  InputNoCompteFormFieldComponent
} from 'src/app/_modules/form-field/input/no-compte/input.component';
import {
  InputPieceFormFieldComponent
} from 'src/app/_modules/form-field/input/piece/input.component';
import {
  ComptabiliteBilanEcranResolver
} from 'src/app/_resolver/comptabilite/bilan-ecran.resolver';
import {
  ComptabiliteListeEcrituresResolver
} from 'src/app/_resolver/comptabilite/liste-ecritures-journal.resolver';
import {
  ComptabilitePlanComptableResolver
} from 'src/app/_resolver/comptabilite/plan-comptable.resolver';
import {ConfigResolver} from 'src/app/_resolver/config/config.resolver';

import {SharedModule} from '../../shared/shared.module';

import {BilanEcranComponent} from './bilan-ecran/bilan-ecran.component';
import {DialogPeriodeComptaDialog} from './dialog/dialog-periode-compta';
import {JournaliserComponent} from './journaliser/journaliser.component';
import {
  SaisieEcrituresComponent
} from './saisie-ecritures/saisie-ecritures.component';
import {SimpleComponent} from './saisie-ecritures/simple/simple.component';

export const routes = [
  {path : '', redirectTo : 'bilan-ecran', pathMatch : 'full'}, {
    path : 'bilan-ecran',
    component : BilanEcranComponent,
    data : {breadcrumb : 'Bilan situation à l\'écran'},
    resolve : {config : ConfigResolver, items : ComptabiliteBilanEcranResolver}
  },
  {
    path : 'saisie-ecritures',
    component : SaisieEcrituresComponent,
    data : {breadcrumb : 'Saisie d\'écritures'},
    resolve : {
      config : ConfigResolver,
      ecritures : ComptabiliteListeEcrituresResolver
    }
  },
  {
    path : 'saisie-ecriture-simple',
    component : SimpleComponent,
    data : {breadcrumb : 'Saisie d\'écriture simple'},
    resolve : {
      config : ConfigResolver,
      planComptable : ComptabilitePlanComptableResolver
    }
  },
  {
    path : 'journaliser-ecritures',
    component : JournaliserComponent,
    data : {breadcrumb : 'Journaliser écritures'},
    resolve : {
      config : ConfigResolver,
      ecritures : ComptabiliteListeEcrituresResolver
    }
  }
];

@NgModule({
  imports : [
    CommonModule, RouterModule.forChild(routes), NgxDatatableModule,
    SharedModule,
    GridModule,    // Kendo UI
    ButtonsModule, // Kendo UI
    FormsModule, ReactiveFormsModule
  ],
  declarations : [
    BilanEcranComponent, SaisieEcrituresComponent, SimpleComponent,
    JournaliserComponent, InputNoCompteFormFieldComponent,
    InputMontantFormFieldComponent, InputLibelleFormFieldComponent,
    InputDateEcritureFormFieldComponent, InputPieceFormFieldComponent,
    DialogPeriodeComptaDialog, InputDateExerciceComptFormFieldComponent
  ],
  entryComponents : [ DialogPeriodeComptaDialog ]
})
export class ComptabiliteModule {
}
