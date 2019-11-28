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
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
import 'leaflet-map';
import 'style-loader!leaflet/dist/leaflet.css';

import {AfterViewInit, Component} from '@angular/core';

import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

declare var L: any;

@Component({
  selector : 'app-leaflet-maps',
  templateUrl : './leaflet-maps.component.html'
})
export class LeafletMapsComponent implements AfterViewInit {
  private settings: Settings;
  public constructor(private appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      const el = document.getElementById('leaflet-map');
      L.Icon.Default.imagePath = 'assets/img/vendor/leaflet';
      const map = L.map(el).setView([ 51.505, -0.09 ], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution :
             '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(map);

      L.marker([ 51.5, -0.09 ])
          .addTo(map)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();
    });
  }
}
