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
import {ModuleWithProviders} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {BlankComponent} from './pages/blank/blank.component';
import {ErrorComponent} from './pages/errors/error/error.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {PagesComponent} from './pages/pages.component';
import {SearchComponent} from './pages/search/search.component';

export const routes: Routes = [
  {
    path : 'index',
    component : PagesComponent,
    children : [
      {
        path : '',
        loadChildren : () => import('./pages/dashboard/dashboard.module')
                                 .then(m => m.DashboardModule),
        data : {breadcrumb : 'Dashboard'}
      },
      {
        path : 'comptabilite',
        loadChildren : () => import('./pages/comptabilite/comptabilite.module')
                                 .then(m => m.ComptabiliteModule),
        data : {breadcrumb : 'Comptabilité'}
      },
      {
        path : 'users',
        loadChildren : () =>
            import('./pages/users/users.module').then(m => m.UsersModule),
        data : {breadcrumb : 'Users'}
      },
      {
        path : 'ui',
        loadChildren : () =>
            import('./pages/ui/ui.module').then(m => m.UiModule),
        data : {breadcrumb : 'UI'}
      },
      {
        path : 'form-controls',
        loadChildren : () =>
            import('./pages/form-controls/form-controls.module')
                .then(m => m.FormControlsModule),
        data : {breadcrumb : 'Form Controls'}
      },
      {
        path : 'tables',
        loadChildren : () =>
            import('./pages/tables/tables.module').then(m => m.TablesModule),
        data : {breadcrumb : 'Tables'}
      },
      {
        path : 'icons',
        loadChildren : () =>
            import('./pages/icons/icons.module').then(m => m.IconsModule),
        data : {breadcrumb : 'Material Icons'}
      },
      {
        path : 'drag-drop',
        loadChildren : () => import('./pages/drag-drop/drag-drop.module')
                                 .then(m => m.DragDropModule),
        data : {breadcrumb : 'Drag & Drop'}
      },
      {
        path : 'schedule',
        loadChildren : () => import('./pages/schedule/schedule.module')
                                 .then(m => m.ScheduleModule),
        data : {breadcrumb : 'Schedule'}
      },
      {
        path : 'mailbox',
        loadChildren : () =>
            import('./pages/mailbox/mailbox.module').then(m => m.MailboxModule),
        data : {breadcrumb : 'Mailbox'}
      },
      {
        path : 'chat',
        loadChildren : () =>
            import('./pages/chat/chat.module').then(m => m.ChatModule),
        data : {breadcrumb : 'Chat'}
      },
      {
        path : 'maps',
        loadChildren : () =>
            import('./pages/maps/maps.module').then(m => m.MapsModule),
        data : {breadcrumb : 'Maps'}
      },
      {
        path : 'charts',
        loadChildren : () =>
            import('./pages/charts/charts.module').then(m => m.ChartsModule),
        data : {breadcrumb : 'Charts'}
      },
      {
        path : 'dynamic-menu',
        loadChildren : () => import('./pages/dynamic-menu/dynamic-menu.module')
                                 .then(m => m.DynamicMenuModule),
        data : {breadcrumb : 'Dynamic Menu'}
      },
      {
        path : 'profile',
        loadChildren : () =>
            import('./pages/profile/profile.module').then(m => m.ProfileModule),
        data : {breadcrumb : 'Profile'}
      },
      {
        path : 'blank',
        component : BlankComponent,
        data : {breadcrumb : 'Blank page'}
      },
      {
        path : 'search',
        component : SearchComponent,
        data : {breadcrumb : 'Search'}
      }
    ]
  },
  {
    path : '',
    loadChildren : () =>
        import('./pages/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path : 'login',
    loadChildren : () =>
        import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path : 'creer-un-compte',
    loadChildren : () =>
        import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path : 'e-mail',
    loadChildren : () =>
        import('./pages/email/email.module').then(m => m.EmailModule)
  },
  {path : 'error', component : ErrorComponent, data : {breadcrumb : 'Error'}},
  {path : '**', component : NotFoundComponent}
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(routes, {
                                     // preloadingStrategy: PreloadAllModules,
                                     // // <- uncomment this line for disable
                                     // lazy load useHash: true
                                 });
