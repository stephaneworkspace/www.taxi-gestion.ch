var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
export const routes = [
    { path: '', redirectTo: 'autocomplete', pathMatch: 'full' },
    { path: 'autocomplete', component: AutocompleteComponent, data: { breadcrumb: 'Autocomplete' } },
    { path: 'checkbox', component: CheckboxComponent, data: { breadcrumb: 'Checkbox' } },
    { path: 'datepicker', component: DatepickerComponent, data: { breadcrumb: 'Datepicker' } },
    { path: 'form-field', component: FormFieldComponent, data: { breadcrumb: 'Form Field' } },
    { path: 'input', component: InputComponent, data: { breadcrumb: 'Input' } },
    { path: 'radio-button', component: RadioButtonComponent, data: { breadcrumb: 'Radio Button' } },
    { path: 'select', component: SelectComponent, data: { breadcrumb: 'Select' } },
    { path: 'slider', component: SliderComponent, data: { breadcrumb: 'Slider' } },
    { path: 'slide-toggle', component: SlideToggleComponent, data: { breadcrumb: 'Slide Toggle' } }
];
let FormControlsModule = class FormControlsModule {
};
FormControlsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FormsModule,
            ReactiveFormsModule,
            PerfectScrollbarModule,
            SharedModule
        ],
        declarations: [
            AutocompleteComponent,
            CheckboxComponent,
            DatepickerComponent,
            FormFieldComponent,
            InputComponent,
            RadioButtonComponent,
            SelectComponent,
            SliderComponent,
            SlideToggleComponent
        ]
    })
], FormControlsModule);
export { FormControlsModule };
//# sourceMappingURL=form-controls.module.js.map