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
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {disk_space} from '../dashboard.data';

@Component(
    {selector : 'app-disk-space', templateUrl : './disk-space.component.html'})
export class DiskSpaceComponent implements OnInit, AfterViewChecked {
  private data: any[];
  private showLegend = false;
  private gradient = true;
  private colorScheme = {domain : [ '#2F3E9E', '#D22E2E', '#378D3B' ]};
  private showLabels = true;
  private explodeSlices = true;
  private doughnut = false;
  @ViewChild('resizedDiv', {static : true}) resizedDiv: ElementRef;
  private previousWidthOfResizedDiv: number;

  public constructor() {}

  public ngOnInit() {
    this.data = disk_space;
    this.previousWidthOfResizedDiv = 0;
  }

  public ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv !==
        this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.data = [...disk_space ]);
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

  public onSelect(event) { console.log(event); }
}
