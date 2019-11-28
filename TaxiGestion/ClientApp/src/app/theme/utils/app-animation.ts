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
import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';

export const blockTransition =
    trigger(
        'blockTransition', [
          transition(':enter',
                     [
                       query('.block', style({opacity : 0}), {optional : true}),
                       query(
                           '.block',
                           stagger(150,
                                   [
                                     style({transform : 'translateY(100px)'}),
                                     animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style(
                                                                                        {
                                                                                          transform : 'translateY(0px)',
                                                                                          opacity : 1
                                                                                        })),
                                   ]),
                           {optional : true}),
                     ]),
          transition(':leave',
                     [
                       query(
                           '.block',
                           stagger(100,
                                   [
                                     style({
                                       transform : 'translateY(0px)',
                                       opacity : 1
                                     }),
                                     animate(
                                         '1s cubic-bezier(.75,-0.48,.26,1.52)',
                                         style(
                                             {
                                               transform : 'translateY(100px)',
                                               opacity : 0
                                             })),
                                   ]),
                           {optional : true}),
                     ])
        ]);

export const listTransition = trigger('listTransition', [
  transition(':enter',
             [
               query('.list', style({opacity : 0}), {optional : true}),
               query('.list', stagger('300ms', [ animate(
                                                   '1s ease-in', keyframes([
                                                     style({
                                                       opacity : 0,
                                                       transform : 'translateY(-75px)',
                                                       offset : 0
                                                     }),
                                                     style(
                                                         {
                                                           opacity : .5,
                                                           transform : 'translateY(35px)',
                                                           offset : 0.3
                                                         }),
                                                     style(
                                                         {
                                                           opacity : 1,
                                                           transform : 'translateY(0)',
                                                           offset : 1
                                                         })
                                                   ])) ]),
                     {optional : true})
             ]),
  transition(':leave',
             [ query('.list',
                     stagger('300ms',
                             [ animate('1s ease-in', keyframes([
                                         style({
                                           opacity : 1,
                                           transform : 'translateY(0)',
                                           offset : 0
                                         }),
                                         style({
                                           opacity : .5,
                                           transform : 'translateY(35px)',
                                           offset : 0.3
                                         }),
                                         style({
                                           opacity : 0,
                                           transform : 'translateY(-75px)',
                                           offset : 1
                                         })
                                       ])) ]),
                     {optional : true}) ])
]);
