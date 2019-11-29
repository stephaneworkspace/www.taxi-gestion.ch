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
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {customers, orders, products, refunds} from '../dashboard.data';

@Component({
  selector : 'app-info-cards',
  templateUrl : './info-cards.component.html',
  styleUrls : [ './info-cards.component.scss' ]
})
export class InfoCardsComponent implements OnInit, OnDestroy, AfterViewChecked {
  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
  public colorScheme = {domain : [ '#999' ]};
  public autoScale = true;
  @ViewChild('resizedDiv', {static : true}) resizedDiv: ElementRef;
  private previousWidthOfResizedDiv: number;
  private settings: Settings;
  public constructor(private appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.previousWidthOfResizedDiv = 0;
    this.orders = orders;
    this.products = products;
    this.customers = customers;
    this.refunds = refunds;
    this.orders = this.addRandomValue('orders');
    this.customers = this.addRandomValue('customers');
  }

  public ngOnDestroy() {
    this.orders[0].series.length = 0;
    this.customers[0].series.length = 0;
  }

  public ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv !==
        this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.orders = [...orders ]);
      setTimeout(() => this.products = [...products ]);
      setTimeout(() => this.customers = [...customers ]);
      setTimeout(() => this.refunds = [...refunds ]);
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

  public onSelect(event) { console.log(event); }

  private addRandomValue(param) {
    switch (param) {
    case 'orders':
      for (let i = 1; i < 30; i++) {
        this.orders[0].series.push(
            {name : 1980 + i, value : Math.ceil(Math.random() * 1000000)});
      }
      return this.orders;
    case 'customers':
      for (let i = 1; i < 15; i++) {
        this.customers[0].series.push(
            {name : 2000 + i, value : Math.ceil(Math.random() * 1000000)});
      }
      return this.customers;
    default:
      return this.orders;
    }
  }
}
