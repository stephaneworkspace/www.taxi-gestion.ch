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

@Injectable()
export class MessagesService {

  private messages = [
    {
      name : 'ashley',
      text:
          'After you get up and running, you can place Font Awesome icons just about...',
      time: '1 min ago'
    },
    {
      name : 'michael',
      text:
          'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
      time: '2 hrs ago'
    },
    {
      name : 'julia',
      text:
          'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
      time: '10 hrs ago'
    },
    {
      name : 'bruno',
      text:
          'Explore your passions and discover new ones by getting involved. Stretch your...',
      time: '1 day ago'
    },
    {
      name : 'tereza',
      text:
          'Get to know who we are - from the inside out. From our history and culture, to the...',
      time: '1 day ago'
    },
    {
      name : 'adam',
      text:
          'Need some support to reach your goals? Apply for scholarships across...',
      time: '2 days ago'
    },
    {
      name : 'michael',
      text:
          'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
      time: '1 week ago'
    }
  ];

  private files = [
    {text : 'gradus.zip', size: '~6.2 MB', value: '47', color: 'primary'}, {
      text : 'documentation.pdf',
      size: '~14.6 MB',
      value: '33',
      color: 'accent'
    },
    {text : 'wallpaper.jpg', size: '~558 KB', value: '60', color: 'warn'},
    {text : 'letter.doc', size: '~57 KB', value: '80', color: 'primary'},
    {text : 'azimuth.zip', size: '~10.2 MB', value: '55', color: 'warn'},
    {text : 'contacts.xlsx', size: '~96 KB', value: '75', color: 'accent'}
  ];

  private meetings = [
    {
      day : '09',
      month: 'May',
      title: 'Meeting with Bruno',
      text:
          'Fusce ut condimentum velit, quis egestas eros. Quisque sed condimentum neque.',
      color: 'danger'
    },
    {
      day : '15',
      month: 'May',
      title: 'Training course',
      text:
          'Fusce arcu tortor, tempor aliquam augue vel, consectetur vehicula lectus.',
      color: 'primary'
    },
    {
      day : '12',
      month: 'June',
      title: 'Dinner with Ashley',
      text: 'Curabitur rhoncus facilisis augue sed fringilla.',
      color: 'info'
    },
    {
      day : '14',
      month: 'June',
      title: 'Sport time',
      text: 'Vivamus tristique enim eros, ac ultricies sem ultrices vitae.',
      color: 'warning'
    },
    {
      day : '29',
      month: 'July',
      title: 'Birthday of Julia',
      text: 'Nam porttitor justo nec elit efficitur vestibulum.',
      color: 'success'
    }
  ];

  public getMessages(): Array<object> { return this.messages; }

  public getFiles(): Array<object> { return this.files; }

  public getMeetings(): Array<object> { return this.meetings; }
}
