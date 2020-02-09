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
 * This program is free software; the source ode is released under and Creative
 * Commons License.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedModule} from '../../shared/shared.module';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {FormFieldComponent} from './form-field/form-field.component';
import {InputComponent} from './input/input.component';
import {RadioButtonComponent} from './radio-button/radio-button.component';
import {SelectComponent} from './select/select.component';
import {SlideToggleComponent} from './slide-toggle/slide-toggle.component';
import {SliderComponent} from './slider/slider.component';

export const routes = [
  {path : '', redirectTo : 'autocomplete', pathMatch : 'full'}, {
    path : 'autocomplete',
    component : AutocompleteComponent,
    data : {breadcrumb : 'Autocomplete'}
  },
  {
    path : 'checkbox',
    component : CheckboxComponent,
    data : {breadcrumb : 'Checkbox'}
  },
  {
    path : 'datepicker',
    component : DatepickerComponent,
    data : {breadcrumb : 'Datepicker'}
  },
  {
    path : 'form-field',
    component : FormFieldComponent,
    data : {breadcrumb : 'Form Field'}
  },
  {path : 'input', component : InputComponent, data : {breadcrumb : 'Input'}}, {
    path : 'radio-button',
    component : RadioButtonComponent,
    data : {breadcrumb : 'Radio Button'}
  },
  {
    path : 'select',
    component : SelectComponent,
    data : {breadcrumb : 'Select'}
  },
  {
    path : 'slider',
    component : SliderComponent,
    data : {breadcrumb : 'Slider'}
  },
  {
    path : 'slide-toggle',
    component : SlideToggleComponent,
    data : {breadcrumb : 'Slide Toggle'}
  }
];

@NgModule({
  imports : [
    CommonModule, RouterModule.forChild(routes), FormsModule,
    ReactiveFormsModule, PerfectScrollbarModule, SharedModule
  ],
  declarations : [
    AutocompleteComponent, CheckboxComponent, DatepickerComponent,
    FormFieldComponent, InputComponent, RadioButtonComponent, SelectComponent,
    SliderComponent, SlideToggleComponent
  ]
})
export class FormControlsModule {
}
