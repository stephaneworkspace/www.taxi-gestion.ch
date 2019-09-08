import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EmailConfirmationInscriptionComponent } from './confirmation-inscription/confirmation-inscription.component';
import { EmailConfirmationInscriptionResolver } from 'src/app/_resolver/e-mail/confirmation-inscription.resolver';
//import { ButtonsModule } from '@progress/kendo-angular-buttons';

export const routes = [
  { path: '', redirectTo: 'confirmation-inscription/0/0', pathMatch: 'full'},
  { 
      path: 'confirmation-inscription/:idUtilisateur/:code', 
      component: EmailConfirmationInscriptionComponent, 
      data: { breadcrumb: 'E-Mail de confirmation' }, 
      resolve: { item: EmailConfirmationInscriptionResolver }, 
    }, 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    // ButtonsModule, // Kendo UI
  ],
  declarations: [
    EmailConfirmationInscriptionComponent
  ],
  providers: [
  ]
})
export class EmailModule { }
