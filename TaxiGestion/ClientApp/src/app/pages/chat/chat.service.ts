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
import {Injectable} from '@angular/core';
import {Chat} from './chat.model';

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();

// let chats = [
//     new Chat(
//         'assets/img/profile/ashley.jpg',
//         'Ashley Ahlberg',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.
//         What do you think about Gradus Admin Template?', new Date(year,
//         month, day-2, hour, minute), false
//     ),
//     new Chat(
//         'assets/img/profile/bruno.jpg',
//         'Bruno Vespa',
//         'Do not disturb',
//         'Hi, I\'m looking for admin template with angular material 2 design.
//         What do you think about Gradus Admin Template?', new Date(year,
//         month, day-2, hour, minute), false
//     ),
//     new Chat(
//         'assets/img/profile/julia.jpg',
//         'Julia Aniston',
//         'Away',
//         'Hi, I\'m looking for admin template with angular material 2 design.
//         What do you think about Gradus Admin Template?', new Date(year,
//         month, day-2, hour, minute), false
//     ),
//     new Chat(
//         'assets/img/profile/adam.jpg',
//         'Adam Sandler',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.
//         What do you think about Gradus Admin Template?', new Date(year,
//         month, day-2, hour, minute), false
//     ),
//     new Chat(
//         'assets/img/profile/tereza.jpg',
//         'Tereza Stiles',
//         'Offline',
//         'Hi, I\'m looking for admin template with angular material 2 design.
//         What do you think about Gradus Admin Template?', new Date(year,
//         month, day-2, hour, minute), false
//     ),
//     new Chat(
//         'assets/img/profile/michael.jpg',
//         'Michael Blair',
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.
//         What do you think about Gradus Admin Template?', new Date(year,
//         month, day-2, hour, minute), false
//     )
// ]

const chats = [
  new Chat('assets/img/profile/ashley.jpg', 'Ashley Ahlberg', 'Online',
           'Great, then I\'ll definitely buy this theme. Thanks!',
           new Date(year, month, day - 2, hour, minute), false),
  new Chat('assets/img/profile/bruno.jpg', 'Bruno Vespa', 'Do not disturb',
           'Great, then I\'ll definitely buy this theme. Thanks!',
           new Date(year, month, day - 2, hour, minute), false),
  new Chat('assets/img/profile/julia.jpg', 'Julia Aniston', 'Away',
           'Great, then I\'ll definitely buy this theme. Thanks!',
           new Date(year, month, day - 2, hour, minute), false),
  new Chat('assets/img/profile/adam.jpg', 'Adam Sandler', 'Online',
           'Great, then I\'ll definitely buy this theme. Thanks!',
           new Date(year, month, day - 2, hour, minute), false),
  new Chat('assets/img/profile/tereza.jpg', 'Tereza Stiles', 'Offline',
           'Great, then I\'ll definitely buy this theme. Thanks!',
           new Date(year, month, day - 2, hour, minute), false),
  new Chat('assets/img/profile/michael.jpg', 'Michael Blair', 'Online',
           'Great, then I\'ll definitely buy this theme. Thanks!',
           new Date(year, month, day - 2, hour, minute), false)
];

const talks = [
  new Chat(
      'assets/img/profile/ashley.jpg', 'Ashley Ahlberg', 'Online',
      'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
      new Date(year, month, day - 2, hour, minute + 3), false),
  new Chat(
      'assets/img/users/user.jpg', 'Emilio Verdines', 'Online',
      'Hi, Gradus is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...',
      new Date(year, month, day - 2, hour, minute + 2), true)
];

@Injectable()
export class ChatService {
  public getChats(): Array<Chat> { return chats; }
  public getTalk(): Array<Chat> { return talks; }
}
