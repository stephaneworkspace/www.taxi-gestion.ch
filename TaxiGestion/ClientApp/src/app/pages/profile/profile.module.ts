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
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *****************************************************************************/
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ProfileComponent} from './profile.component';
import {ProjectsComponent} from './projects/projects.component';
import {UserInfoComponent} from './user-info/user-info.component';

export const routes = [ {
  path : '',
  component : ProfileComponent,
  children : [
    {path : '', redirectTo : 'projects', pathMatch : 'full'}, {
      path : 'projects',
      component : ProjectsComponent,
      data : {breadcrumb : 'Projects'}
    },
    {
      path : 'user-info',
      component : UserInfoComponent,
      data : {breadcrumb : 'User Information'}
    }
  ]
} ];

@NgModule({
  declarations : [ ProfileComponent, ProjectsComponent, UserInfoComponent ],
  imports : [
    CommonModule, ReactiveFormsModule, SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule {
}
