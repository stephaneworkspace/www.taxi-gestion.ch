var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { MailboxService } from './mailbox.service';
let MailboxComponent = class MailboxComponent {
    constructor(appSettings, formBuilder, snackBar, mailboxService) {
        this.appSettings = appSettings;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.mailboxService = mailboxService;
        this.sidenavOpen = true;
        this.type = 'all';
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.getMails();
        if (window.innerWidth <= 992) {
            this.sidenavOpen = false;
        }
        this.form = this.formBuilder.group({
            'to': ['', Validators.required],
            'cc': null,
            'subject': null,
            'message': null
        });
    }
    onWindowResize() {
        (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }
    getMails() {
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
    viewDetail(mail) {
        this.mail = this.mailboxService.getMail(mail.id);
        this.mails.forEach(m => m.selected = false);
        this.mail.selected = true;
        this.mail.unread = false;
        this.newMail = false;
        if (window.innerWidth <= 992) {
            this.sidenav.close();
        }
    }
    compose() {
        this.mail = null;
        this.newMail = true;
    }
    setAsRead() {
        this.mail.unread = false;
    }
    setAsUnRead() {
        this.mail.unread = true;
    }
    delete() {
        this.mail.trash = true;
        this.mail.sent = false;
        this.mail.draft = false;
        this.mail.starred = false;
        this.getMails();
        this.mail = null;
    }
    changeStarStatus() {
        this.mail.starred = !this.mail.starred;
        this.getMails();
    }
    restore() {
        this.mail.trash = false;
        this.type = 'all';
        this.getMails();
        this.mail = null;
    }
    onSubmit(mail) {
        console.log(mail);
        if (this.form.valid) {
            this.snackBar.open('Mail sent to ' + mail.to + ' successfully!', null, {
                duration: 2000,
            });
            this.form.reset();
        }
    }
};
__decorate([
    ViewChild('sidenav', { static: true }),
    __metadata("design:type", Object)
], MailboxComponent.prototype, "sidenav", void 0);
__decorate([
    HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MailboxComponent.prototype, "onWindowResize", null);
MailboxComponent = __decorate([
    Component({
        selector: 'app-mailbox',
        templateUrl: './mailbox.component.html',
        styleUrls: ['./mailbox.component.scss'],
        providers: [MailboxService]
    }),
    __metadata("design:paramtypes", [AppSettings,
        FormBuilder,
        MatSnackBar,
        MailboxService])
], MailboxComponent);
export { MailboxComponent };
//# sourceMappingURL=mailbox.component.js.map