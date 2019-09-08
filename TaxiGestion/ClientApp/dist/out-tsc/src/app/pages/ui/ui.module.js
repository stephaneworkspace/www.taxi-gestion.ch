var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { ListsComponent } from './lists/lists.component';
import { GridsComponent } from './grids/grids.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { DialogComponent, DialogOverviewExampleDialog } from './dialog/dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
export const routes = [
    { path: '', redirectTo: 'buttons', pathMatch: 'full' },
    { path: 'buttons', component: ButtonsComponent, data: { breadcrumb: 'Buttons' } },
    { path: 'cards', component: CardsComponent, data: { breadcrumb: 'Cards' } },
    { path: 'lists', component: ListsComponent, data: { breadcrumb: 'Lists' } },
    { path: 'grids', component: GridsComponent, data: { breadcrumb: 'Grids' } },
    { path: 'tabs', component: TabsComponent, data: { breadcrumb: 'Tabs' } },
    { path: 'expansion-panel', component: ExpansionPanelComponent, data: { breadcrumb: 'Expansion Panel' } },
    { path: 'chips', component: ChipsComponent, data: { breadcrumb: 'Chips' } },
    { path: 'progress', component: ProgressComponent, data: { breadcrumb: 'Progress' } },
    { path: 'dialog', component: DialogComponent, data: { breadcrumb: 'Dialog' } },
    { path: 'tooltip', component: TooltipComponent, data: { breadcrumb: 'Tooltip' } },
    { path: 'snack-bar', component: SnackBarComponent, data: { breadcrumb: 'Snackbar' } }
];
let UiModule = class UiModule {
};
UiModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            FormsModule,
            SharedModule
        ],
        declarations: [
            ButtonsComponent,
            CardsComponent,
            ListsComponent,
            GridsComponent,
            TabsComponent,
            ExpansionPanelComponent,
            ChipsComponent,
            ProgressComponent,
            TooltipComponent,
            DialogComponent,
            DialogOverviewExampleDialog,
            SnackBarComponent
        ],
        entryComponents: [
            DialogOverviewExampleDialog
        ]
    })
], UiModule);
export { UiModule };
//# sourceMappingURL=ui.module.js.map