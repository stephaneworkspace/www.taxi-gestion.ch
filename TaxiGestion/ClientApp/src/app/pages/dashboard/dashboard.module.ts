import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DialogPeriodeComptaDialog } from './dialog/dialog-periode-compta';
import { InputDateExerciceComptFormFieldComponent } from 'src/app/_modules/form-field/input/date-exercice-compta/input-date-exercice-compta.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    InfoCardsComponent,
    DiskSpaceComponent,
    TodoComponent,
    AnalyticsComponent,
    DialogPeriodeComptaDialog,
    InputDateExerciceComptFormFieldComponent
  ],
  entryComponents: [
    DialogPeriodeComptaDialog
  ]
})
export class DashboardModule { }
