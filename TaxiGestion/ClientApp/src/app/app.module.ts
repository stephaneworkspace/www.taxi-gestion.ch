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
import {AgmCoreModule} from '@agm/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CustomOverlayContainer} from './theme/utils/custom-overlay-container';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation : true,
  suppressScrollX : true
};
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {SharedModule} from './shared/shared.module';
import {PipesModule} from './theme/pipes/pipes.module';
import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {BlankComponent} from './pages/blank/blank.component';
import {SearchComponent} from './pages/search/search.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {ErrorComponent} from './pages/errors/error/error.component';
import {AppSettings} from './app.settings';
import {SidenavComponent} from './theme/components/sidenav/sidenav.component';
import {
  VerticalMenuComponent
} from './theme/components/menu/vertical-menu/vertical-menu.component';
import {
  HorizontalMenuComponent
} from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import {
  BreadcrumbComponent
} from './theme/components/breadcrumb/breadcrumb.component';
import {
  FlagsMenuComponent
} from './theme/components/flags-menu/flags-menu.component';
import {
  FullScreenComponent
} from './theme/components/fullscreen/fullscreen.component';
import {
  ApplicationsComponent
} from './theme/components/applications/applications.component';
import {
  MessagesComponent
} from './theme/components/messages/messages.component';
import {
  UserMenuComponent
} from './theme/components/user-menu/user-menu.component';
import {GridModule} from '@progress/kendo-angular-grid';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {
  ComptabiliteBilanEcranResolver
} from './_resolver/comptabilite/bilan-ecran.resolver';
import {
  EmailConfirmationInscriptionResolver
} from './_resolver/e-mail/confirmation-inscription.resolver';
import {
  ComptabilitePlanComptableResolver
} from './_resolver/comptabilite/plan-comptable.resolver';
import {
  ComptabiliteListeEcrituresResolver
} from './_resolver/comptabilite/liste-ecritures-journal.resolver';
import {
  TGC003SaisieEcrituresService
} from './_services/TGC003SaisieEcrituresService';
import {DecimalPipe} from '@angular/common';
import {ConfigResolver} from './_resolver/config/config.resolver';

@NgModule({
  imports : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey : 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'}),
    PerfectScrollbarModule,
    CalendarModule.forRoot(
        {provide : DateAdapter, useFactory : adapterFactory}),
    SharedModule,
    PipesModule,
    routing,
    HttpClientModule,
    GridModule,
    ButtonsModule,
  ],
  declarations : [
    AppComponent, PagesComponent, BlankComponent, SearchComponent,
    NotFoundComponent, ErrorComponent, SidenavComponent, VerticalMenuComponent,
    HorizontalMenuComponent, BreadcrumbComponent, FlagsMenuComponent,
    FullScreenComponent, ApplicationsComponent, MessagesComponent,
    UserMenuComponent
  ],
  entryComponents : [ VerticalMenuComponent ],
  providers : [
    AppSettings, {
      provide : PERFECT_SCROLLBAR_CONFIG,
      useValue : DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide : OverlayContainer, useClass : CustomOverlayContainer},
    EmailConfirmationInscriptionResolver, ComptabiliteBilanEcranResolver,
    ComptabilitePlanComptableResolver, ComptabiliteListeEcrituresResolver,
    ConfigResolver
  ],
  bootstrap : [ AppComponent ]
})
export class AppModule {
}
