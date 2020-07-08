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
import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

export interface ScrollEvent {
  originalEvent: Event;
  isWindowEvent: boolean;
  scrollTop: number;
}

/* tslint:disable-next-line */
@Directive({selector : '[detectScroll]'})
export class DetectScrollDirective {
  /* tslint:disable-next-line */
  @Output() onScroll = new EventEmitter<ScrollEvent>();

  @HostListener('scroll', [ '$event' ])
  public elementScrolled(event) {
    const scrollTop = event.target.scrollTop;
    const emitValue:
        ScrollEvent = {originalEvent : event, isWindowEvent : false, scrollTop};
    this.onScroll.emit(emitValue);
  }

  @HostListener('window:scroll', [ '$event' ])
  public windowScrolled(event) {
    const scrollTop = window.pageYOffset ||
                      document.documentElement.scrollTop ||
                      document.body.scrollTop || 0;
    const emitValue:
        ScrollEvent = {originalEvent : event, isWindowEvent : true, scrollTop};
    this.onScroll.emit(emitValue);
  }
}
