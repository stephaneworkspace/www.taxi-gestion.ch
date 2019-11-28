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
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';

import {Chat} from './chat.model';
import {ChatService} from './chat.service';

@Component({
  selector : 'app-chat',
  templateUrl : './chat.component.html',
  styleUrls : [ './chat.component.scss' ],
  providers : [ ChatService ]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static : true}) sidenav: any;
  private settings: Settings;
  private userImage = 'assets/img/users/user.jpg';
  private chats: Array<Chat>;
  private talks: Array<Chat>;
  private sidenavOpen: boolean;
  private currentChat: Chat;
  private newMessage: string;

  public constructor(private appSettings: AppSettings,
                     private chatService: ChatService) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.sidenavOpen = true;
    this.chats = this.chatService.getChats();
    if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }
  }

  public ngOnDestroy() {
    if (this.talks) {
      this.talks.length = 2;
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false
                               : this.sidenavOpen = true;
  }

  private getChat(obj) {
    if (this.talks) {
      this.talks.length = 2;
    }
    this.talks = this.chatService.getTalk();
    this.talks.push(obj);
    this.currentChat = obj;
    this.talks.forEach(talk => {
      if (!talk.my) {
        talk.image = obj.image;
      }
    });
    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }

  public sendMessage($event) {
    if (($event.which === 1 || $event.which === 13) &&
        this.newMessage.trim() !== '') {
      if (this.talks) {
        this.talks.push(new Chat('assets/img/users/user.jpg', 'Emilio Verdines',
                                 'online', this.newMessage, new Date(), true));
        this.newMessage = '';
        const chatContainer = document.querySelector('.chat-content');
        if (chatContainer) {
          setTimeout(() => {
            const nodes = chatContainer.querySelectorAll('.mat-list-item');
            const newChatTextHeight = nodes[nodes.length - 1];
            chatContainer.scrollTop =
                chatContainer.scrollHeight + newChatTextHeight.clientHeight;
          });
        }
      }
    }
  }
}
