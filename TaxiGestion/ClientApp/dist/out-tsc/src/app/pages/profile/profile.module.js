var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserInfoComponent } from './user-info/user-info.component';
export const routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            { path: '', redirectTo: 'projects', pathMatch: 'full' },
            { path: 'projects', component: ProjectsComponent, data: { breadcrumb: 'Projects' } },
            { path: 'user-info', component: UserInfoComponent, data: { breadcrumb: 'User Information' } }
        ]
    }
];
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    NgModule({
        declarations: [
            ProfileComponent,
            ProjectsComponent,
            UserInfoComponent
        ],
        imports: [
            CommonModule,
            ReactiveFormsModule,
            SharedModule,
            RouterModule.forChild(routes)
        ]
    })
], ProfileModule);
export { ProfileModule };
//# sourceMappingURL=profile.module.js.map