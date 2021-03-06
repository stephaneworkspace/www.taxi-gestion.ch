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
import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component(
    {selector : 'app-ngx-table', templateUrl : './ngx-table.component.html'})
export class NgxTableComponent implements OnInit {
  @ViewChild(DatatableComponent, {static : true}) table: DatatableComponent;
  private editing = {};
  public rows = [];
  private temp = [];
  public selected = [];
  public loadingIndicator: boolean;
  private reorderable: boolean;
  private columns = [ {prop : 'name'}, {name : 'Gender'}, {name : 'Company'} ];
  private settings: Settings;

  public constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    this.fetch((data) => {
      this.temp = [...data ];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  public ngOnInit() {
    this.loadingIndicator = true;
    this.reorderable = true;
  }

  private fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/company.json');
    req.onload = () => { data(JSON.parse(req.response)); };
    req.send();
  }

  public updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(
        (d) => d.name.toLowerCase().indexOf(val) !== -1 || !val);
    this.rows = temp;
    this.table.offset = 0;
  }

  private updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows ];
  }

  public onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  public onActivate(event) { console.log('Activate Event', event); }
}
