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
export const single = [
  {name : 'Germany', value : 40632}, {name : 'United States', value : 49737},
  {name : 'France', value : 36745}, {name : 'United Kingdom', value : 36240},
  {name : 'Spain', value : 33000}, {name : 'Italy', value : 35800}
];

export const multi = [
  {
    name : 'Germany',
    series : [
      {name : '2017', value : 71632}, {name : '2010', value : 40632},
      {name : '2000', value : 76953}, {name : '1990', value : 31476}
    ]
  },
  {
    name : 'United States',
    series : [
      {name : '2017', value : 82632}, {name : '2010', value : 49737},
      {name : '2000', value : 55986}, {name : '1990', value : 37060}
    ]
  },
  {
    name : 'France',
    series : [
      {name : '2017', value : 51732}, {name : '2010', value : 36745},
      {name : '2000', value : 34774}, {name : '1990', value : 29476}
    ]
  },
  {
    name : 'United Kingdom',
    series : [
      {name : '2017', value : 95652}, {name : '2010', value : 36240},
      {name : '2000', value : 32543}, {name : '1990', value : 26424}
    ]
  }
];

export const bubble = [
  {
    name : 'Germany',
    series : [
      {name : '2009', x : new Date(2009, 0, 1), y : 80.3, r : 80.4},
      {name : '2006', x : new Date(2006, 0, 1), y : 80.3, r : 78},
      {name : '1995', x : new Date(1995, 0, 1), y : 77.7, r : 58.1},
      {name : '1990', x : new Date(1990, 0, 1), y : 75.4, r : 79}
    ]
  },
  {
    name : 'United States',
    series : [
      {name : '2010', x : new Date(2010, 0, 1), y : 78.8, r : 310},
      {name : '2005', x : new Date(2005, 0, 1), y : 76.9, r : 283},
      {name : '1996', x : new Date(1996, 0, 1), y : 78.7, r : 59.1},
      {name : '1990', x : new Date(1990, 0, 1), y : 75.4, r : 253}
    ]
  },
  {
    name : 'France',
    series : [
      {name : '2008', x : new Date(2008, 0, 1), y : 81.4, r : 63},
      {name : '2000', x : new Date(2000, 0, 1), y : 79.1, r : 59.4},
      {name : '1994', x : new Date(1994, 0, 1), y : 76.7, r : 58.1},
      {name : '1990', x : new Date(1990, 0, 1), y : 77.2, r : 56.9}
    ]
  },
  {
    name : 'United Kingdom',
    series : [
      {name : '2007', x : new Date(2007, 0, 1), y : 80.2, r : 62.7},
      {name : '2003', x : new Date(2003, 0, 1), y : 77.8, r : 58.9},
      {name : '1995', x : new Date(1995, 0, 1), y : 78.7, r : 59.1},
      {name : '1990', x : new Date(1990, 0, 1), y : 75.7, r : 57.1}
    ]
  }
];
