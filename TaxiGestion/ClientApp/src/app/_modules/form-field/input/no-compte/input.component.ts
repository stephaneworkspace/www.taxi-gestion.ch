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
import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {
  DtoTGZ001OutDC10CompteForList as DtoDC10
} from 'src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList';
import {TGZ001AffichageService} from 'src/app/_services/TGZ001AffichageService';

@Component({
  selector : 'app-input-no-compte-form-field',
  templateUrl : './input.component.html',
  styleUrls : [ './input.component.scss' ],
})
export class InputNoCompteFormFieldComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() fbNoCompte: string;
  @Input() fbCompte: string;
  @Input() planComptable: DtoDC10[];
  private pTouch: boolean;
  get touch(): boolean { return this.pTouch; }
  @Input()
  set touch(touch: boolean) {
    this.pTouch = touch;
    if (touch) {
      this.formGroup.get(this.fbNoCompte).markAsTouched();
    }
  }

  private planComptableString: string[];
  private planComptable6String: string[];

  private placeholderNoCompte = 'N°';
  private placeholderCompte = 'Compte';

  private filteredOptions: Observable<string[]>;

  private matErrorNoCompte: string;

  public constructor(private serviceTGZ001: TGZ001AffichageService) {}

  public ngOnInit() {
    this.planComptableString =
        this.serviceTGZ001.computeArrayStringPlanComptable(this.planComptable);
    this.planComptable6String =
        this.serviceTGZ001.computeArrayString6PlanComptable(this.planComptable);

    // Autocomplète
    this.filteredOptions =
        this.formGroup.get(this.fbNoCompte)
            .valueChanges.pipe(startWith(''), map(val => this.filter(val)));

    // OnChange n°
    this.formGroup.get(this.fbNoCompte).valueChanges.subscribe(val => {
      // Sécurité à 6 charactères
      let swOk = false;
      if (val.length > 6) {
        this.formGroup.get(this.fbNoCompte).setValue(val.slice(0, 6));
        swOk = true;
      }

      // Trouver le compte et changer le placeholder
      if (val.length === 6 || swOk) {
        let swChange = false;
        this.planComptable.forEach(element => {
          if (element.noCompte.toString() === val.slice(0, 6)) {
            swChange = true;
            this.placeholderNoCompte = 'N° compte';
            this.placeholderCompte = 'Désignation';
            this.formGroup.get(this.fbCompte).setValue(element.texte);
          }
        });
        if (swChange === false) {
          this.placeholderNoCompte = 'N°';
          this.placeholderCompte = 'Compte';
          this.formGroup.get(this.fbCompte).setValue('');
        }
      } else {
        this.placeholderNoCompte = 'N°';
        this.placeholderCompte = 'Compte';
        this.formGroup.get(this.fbCompte).setValue('');
      }
    });
  }

  private filter(val): string[] {
    return this.planComptableString.filter(option => option.indexOf(val) === 0);
  }

  private selectionPlanComptable(): void { alert('À faire un joli modal'); }
}
