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
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  DtoTGC003OutDC30EcritureJournalForListMod as Dto
} from 'src/app/_dto/TGC/DtoTGC003OutDC30EcritureJournalForList';

import {
  TGC003SaisieEcrituresService as Service
} from '../../_services/TGC003SaisieEcrituresService';

@Injectable()
export class ComptabiliteListeEcrituresResolver implements Resolve<Dto[]> {
  public constructor(private service: Service, private router: Router,
                     private snackBar: MatSnackBar) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Dto[]> {
    return this.service.listeDesEcritures().pipe(catchError(error => {
      switch (error.status) {
      case 404:
        this.snackBar.open(
            'Erreur lors du chargement de la liste d\'écritures', 'Erreur Http',
            {duration : 7000, panelClass : [ 'error-snackbar' ]});
        this.router.navigate([ '/index' ]);
        return of(null);
      case 401:
        this.snackBar.open(
            'Veuillez vous authentifier', 'Sécurité',
            {duration : 7000, panelClass : [ 'error-snackbar' ]});
        this.router.navigate([ '/login' ]);
        return of(null);
      default:
        this.snackBar.open(
            'Erreur lors du chargement de la liste d\'écritures', 'Erreur Http',
            {duration : 7000, panelClass : [ 'error-snackbar' ]});
        this.router.navigate([ '/index' ]);
        return of(null);
      }
    }));
  }
}
