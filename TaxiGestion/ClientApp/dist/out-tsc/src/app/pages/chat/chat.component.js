var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, ViewChild } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
let ChatComponent = class ChatComponent {
    constructor(appSettings, chatService) {
        this.appSettings = appSettings;
        this.chatService = chatService;
        this.userImage = 'assets/img/users/user.jpg';
        this.sidenavOpen = true;
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
        this.chats = this.chatService.getChats();
        if (window.innerWidth <= 768) {
            this.sidenavOpen = false;
        }
    }
    onWindowResize() {
        (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }
    getChat(obj) {
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
    sendMessage($event) {
        if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
            if (this.talks) {
                this.talks.push(new Chat('assets/img/users/user.jpg', 'Emilio Verdines', 'online', this.newMessage, new Date(), true));
                this.newMessage = '';
                let chatContainer = document.querySelector('.chat-content');
                if (chatContainer) {
                    setTimeout(() => {
                        var nodes = chatContainer.querySelectorAll('.mat-list-item');
                        let newChatTextHeight = nodes[nodes.length - 1];
                        chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
                    });
                }
            }
        }
    }
    ngOnDestroy() {
        if (this.talks)
            this.talks.length = 2;
    }
};
__decorate([
    ViewChild('sidenav', { static: true }),
    __metadata("design:type", Object)
], ChatComponent.prototype, "sidenav", void 0);
__decorate([
    HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatComponent.prototype, "onWindowResize", null);
ChatComponent = __decorate([
    Component({
        selector: 'app-chat',
        templateUrl: './chat.component.html',
        styleUrls: ['./chat.component.scss'],
        providers: [ChatService]
    }),
    __metadata("design:paramtypes", [AppSettings, ChatService])
], ChatComponent);
export { ChatComponent };
//# sourceMappingURL=chat.component.js.map