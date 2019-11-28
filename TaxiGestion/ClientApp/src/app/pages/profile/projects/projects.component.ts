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
import {Component, OnInit} from '@angular/core';

@Component({
  selector : 'app-projects',
  templateUrl : './projects.component.html',
  styleUrls : [ './projects.component.scss' ]
})
export class ProjectsComponent implements OnInit {
  public projects = [
    {
      image : 'assets/img/projects/1.jpg',
      name: 'Project Name 1',
      desc:
          'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      followers: 10
    },
    {
      image : 'assets/img/projects/2.jpg',
      name: 'Project Name 2',
      desc:
          'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      followers: 28
    },
    {
      image : 'assets/img/projects/3.jpg',
      name: 'Project Name 3',
      desc:
          'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      followers: 15
    },
    {
      image : 'assets/img/projects/4.jpg',
      name: 'Project Name 4',
      desc:
          'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      followers: 43
    }
  ];

  public constructor() {}

  public ngOnInit() {}
}
