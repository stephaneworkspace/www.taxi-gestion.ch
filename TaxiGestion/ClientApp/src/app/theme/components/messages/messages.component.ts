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
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {MessagesService} from './messages.service';

@Component({
  selector : 'app-messages',
  templateUrl : './messages.component.html',
  styleUrls : [ './messages.component.scss' ],
  encapsulation : ViewEncapsulation.None,
  providers : [ MessagesService ]
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static : true}) trigger: MatMenuTrigger;
  private selectedTab: number;
  private messages: Array<object>;
  private files: Array<object>;
  private meetings: Array<object>;

  public constructor(private messagesService: MessagesService) {
    this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
  }

  public ngOnInit() { this.selectedTab = 1; }

  private openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  private onMouseLeave() { this.trigger.closeMenu(); }

  private stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
