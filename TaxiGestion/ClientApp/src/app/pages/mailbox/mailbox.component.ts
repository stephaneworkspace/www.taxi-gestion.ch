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
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';

import {Mail} from './mail.model';
import {MailboxService} from './mailbox.service';

@Component({
  selector : 'app-mailbox',
  templateUrl : './mailbox.component.html',
  styleUrls : [ './mailbox.component.scss' ],
  providers : [ MailboxService ]
})
export class MailboxComponent implements OnInit {
  @ViewChild('sidenav', {static : true}) sidenav: any;
  private settings: Settings;
  private sidenavOpen: boolean;
  private mails: Array<Mail>;
  private mail: Mail;
  private newMail: boolean;
  private type: string;
  private searchText: string;
  private form: FormGroup;

  public constructor(private appSettings: AppSettings,
                     private formBuilder: FormBuilder,
                     private snackBar: MatSnackBar,
                     private mailboxService: MailboxService) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    this.sidenavOpen = true;
    this.type = 'all';
    this.getMails();
    if (window.innerWidth <= 992) {
      this.sidenavOpen = false;
    }
    this.form = this.formBuilder.group({
      to : [ '', Validators.required ],
      cc : null,
      subject : null,
      message : null
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false
                               : this.sidenavOpen = true;
  }

  private getMails() {
    switch (this.type) {
    case 'all':
      this.mails = this.mailboxService.getAllMails();
      break;
    case 'starred':
      this.mails = this.mailboxService.getStarredMails();
      break;
    case 'sent':
      this.mails = this.mailboxService.getSentMails();
      break;
    case 'drafts':
      this.mails = this.mailboxService.getDraftMails();
      break;
    case 'trash':
      this.mails = this.mailboxService.getTrashMails();
      break;
    default:
      this.mails = this.mailboxService.getDraftMails();
    }
  }

  private viewDetail(mail) {
    this.mail = this.mailboxService.getMail(mail.id);
    this.mails.forEach(m => m.selected = false);
    this.mail.selected = true;
    this.mail.unread = false;
    this.newMail = false;
    if (window.innerWidth <= 992) {
      this.sidenav.close();
    }
  }

  private compose() {
    this.mail = null;
    this.newMail = true;
  }

  private setAsRead() { this.mail.unread = false; }

  private setAsUnRead() { this.mail.unread = true; }

  private delete() {
    this.mail.trash = true;
    this.mail.sent = false;
    this.mail.draft = false;
    this.mail.starred = false;
    this.getMails();
    this.mail = null;
  }

  private changeStarStatus() {
    this.mail.starred = !this.mail.starred;
    this.getMails();
  }

  private restore() {
    this.mail.trash = false;
    this.type = 'all';
    this.getMails();
    this.mail = null;
  }

  public onSubmit(mail) {
    console.log(mail);
    if (this.form.valid) {
      this.snackBar.open('Mail sent to ' + mail.to + ' successfully!', null, {
        duration : 2000,
      });
      this.form.reset();
    }
  }
}
