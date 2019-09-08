var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UsersData } from './users.data';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
export const routes = [
    { path: '', component: UsersComponent, pathMatch: 'full' }
];
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule,
            RouterModule.forChild(routes),
            FormsModule,
            ReactiveFormsModule,
            InMemoryWebApiModule.forRoot(UsersData, { delay: 500 }),
            NgxPaginationModule,
            SharedModule,
            PipesModule
        ],
        declarations: [
            UsersComponent,
            UserDialogComponent
        ],
        entryComponents: [
            UserDialogComponent
        ]
    })
], UsersModule);
export { UsersModule };
//# sourceMappingURL=users.module.js.map