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
