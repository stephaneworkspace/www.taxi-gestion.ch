import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { NomUtilisateurDisponibleValidator } from 'src/app/_validator/TGA/nomUtilisateurDisponible.validator';
import { EmailDisponibleValidator } from 'src/app/_validator/TGA/emailDisponible.validator';
import { NpaValidator } from 'src/app/_validator/TGA/npa.validator';

export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  providers: [
    NomUtilisateurDisponibleValidator,
    EmailDisponibleValidator,
    NpaValidator
  ]
})
export class RegisterModule { }