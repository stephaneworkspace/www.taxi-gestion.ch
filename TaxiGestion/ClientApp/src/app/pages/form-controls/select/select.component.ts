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
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({selector : 'app-select', templateUrl : './select.component.html'})
export class SelectComponent {
  private settings: Settings;
  // Basic select
  public selectedValue: string;
  public foods = [
    {value : 'steak-0', viewValue: 'Steak'},
    {value : 'pizza-1', viewValue: 'Pizza'},
    {value : 'tacos-2', viewValue: 'Tacos'}
  ];
  // Select with option groups
  public pokemonControl = new FormControl();
  public pokemonGroups = [
    {
      name : 'Grass',
      pokemon:
          [
            {value : 'bulbasaur-0', viewValue: 'Bulbasaur'},
            {value : 'oddish-1', viewValue: 'Oddish'},
            {value : 'bellsprout-2', viewValue: 'Bellsprout'}
          ]
    },
    {
      name : 'Water',
      pokemon:
          [
            {value : 'squirtle-3', viewValue: 'Squirtle'},
            {value : 'psyduck-4', viewValue: 'Psyduck'},
            {value : 'horsea-5', viewValue: 'Horsea'}
          ]
    },
    {
      name : 'Fire',
      disabled: true,
      pokemon:
          [
            {value : 'charmander-6', viewValue: 'Charmander'},
            {value : 'vulpix-7', viewValue: 'Vulpix'},
            {value : 'flareon-8', viewValue: 'Flareon'}
          ]
    },
    {
      name : 'Psychic',
      pokemon:
          [
            {value : 'mew-9', viewValue: 'Mew'},
            {value : 'mewtwo-10', viewValue: 'Mewtwo'},
          ]
    }
  ];
  // Select with multiple selection
  public toppings = new FormControl();
  public toppingList =
      [ 'Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato' ];
  // Select with custom trigger text
  public toppings2 = new FormControl();
  public toppingList2 =
      [ 'Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato' ];
  public constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }
}
