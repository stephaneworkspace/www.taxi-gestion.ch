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
  public selectedTab: number;
  public messages: Array<object>;
  public files: Array<object>;
  public meetings: Array<object>;

  public constructor(private messagesService: MessagesService) {
    this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
  }

  public ngOnInit() { this.selectedTab = 1; }

  public openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  private onMouseLeave() { this.trigger.closeMenu(); }

  public stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
