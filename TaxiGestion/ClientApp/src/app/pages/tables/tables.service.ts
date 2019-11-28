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
import {Injectable} from '@angular/core';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const data: Element[] = [
  {position : 1, name : 'Hydrogen', weight : 1.0079, symbol : 'H'},
  {position : 2, name : 'Helium', weight : 4.0026, symbol : 'He'},
  {position : 3, name : 'Lithium', weight : 6.941, symbol : 'Li'},
  {position : 4, name : 'Beryllium', weight : 9.0122, symbol : 'Be'},
  {position : 5, name : 'Boron', weight : 10.811, symbol : 'B'},
  {position : 6, name : 'Carbon', weight : 12.0107, symbol : 'C'},
  {position : 7, name : 'Nitrogen', weight : 14.0067, symbol : 'N'},
  {position : 8, name : 'Oxygen', weight : 15.9994, symbol : 'O'},
  {position : 9, name : 'Fluorine', weight : 18.9984, symbol : 'F'},
  {position : 10, name : 'Neon', weight : 20.1797, symbol : 'Ne'},
  {position : 11, name : 'Sodium', weight : 22.9897, symbol : 'Na'},
  {position : 12, name : 'Magnesium', weight : 24.305, symbol : 'Mg'},
  {position : 13, name : 'Aluminum', weight : 26.9815, symbol : 'Al'},
  {position : 14, name : 'Silicon', weight : 28.0855, symbol : 'Si'},
  {position : 15, name : 'Phosphorus', weight : 30.9738, symbol : 'P'},
  {position : 16, name : 'Sulfur', weight : 32.065, symbol : 'S'},
  {position : 17, name : 'Chlorine', weight : 35.453, symbol : 'Cl'},
  {position : 18, name : 'Argon', weight : 39.948, symbol : 'Ar'},
  {position : 19, name : 'Potassium', weight : 39.0983, symbol : 'K'},
  {position : 20, name : 'Calcium', weight : 40.078, symbol : 'Ca'},
];

@Injectable()
export class TablesService {

  public constructor() {}

  public getData() { return data; }
}
