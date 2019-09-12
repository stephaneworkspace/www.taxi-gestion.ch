import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { DtoTGZ001OutDC10CompteForList as DtoDC10 } from "src/app/_dto/TGZ/DtoTGZ001OutDC10CompteForList";
import { TGZ001AffichageService } from "src/app/_services/TGZ001AffichageService";

@Component({
    selector: 'input-no-compte-form-field',
    templateUrl: './input-no-compte.html',
    styleUrls: ['./input-no-compte.scss'],
})
export class InputNoCompteFormField implements OnInit {
    @Input() formGroup: FormGroup;
    @Input() fbNoCompte: string;
    @Input() fbCompte: string;
    @Input() planComptable: DtoDC10[];
    private _touch: Boolean;
    get touch(): Boolean {
        return this._touch;
      }
    @Input()
    set touch(touch: Boolean) {
        this._touch = touch;
        if (touch)
            this.formGroup.get(this.fbNoCompte).markAsTouched();

    }

    public planComptableString: string[];
    public planComptable6String: string[];

    public placeholderNoCompte: string = "N°";
    public placeholderCompte: string = "Compte";

    public filteredOptions: Observable<string[]>;

    public matErrorNoCompte: string;

    constructor(
        private serviceTGZ001: TGZ001AffichageService) {
    }

    ngOnInit() {
        this.planComptableString = this.serviceTGZ001.computeArrayStringPlanComptable(this.planComptable);
        this.planComptable6String = this.serviceTGZ001.computeArrayString6PlanComptable(this.planComptable);
        
        // Autocomplète
        this.filteredOptions = this.formGroup.get(this.fbNoCompte).valueChanges
        .pipe(
            startWith(''),
            map(val => this.filter(val))
        );
        
        // OnChange n°
        this.formGroup.get(this.fbNoCompte).valueChanges.subscribe(val => {
            // Sécurité à 6 charactères
            let swOk = false;
            if (val.length > 6) {
                this.formGroup.get(this.fbNoCompte).setValue(val.slice(0, 6));
                swOk = true;
            }

            // Trouver le compte et changer le placeholder
            if (val.length == 6 || swOk) {
                let swChange = false;
                this.planComptable.forEach(element => {
                    if (element.noCompte.toString() == val.slice(0, 6)) {
                        swChange = true;
                        this.placeholderNoCompte = "N° compte";
                        this.placeholderCompte = "Désignation";
                        this.formGroup.get(this.fbCompte).setValue(element.texte);
                    }
                });
                if (swChange == false) {
                    this.placeholderNoCompte = "N°";
                    this.placeholderCompte = "Compte";
                    this.formGroup.get(this.fbCompte).setValue('');
                }
            } else {
                this.placeholderNoCompte = "N°";
                this.placeholderCompte = "Compte";
                this.formGroup.get(this.fbCompte).setValue('');
            }
        });
    }

    filter(val): string[] {
        return this.planComptableString.filter(option => option.indexOf(val) === 0);
    }

    selectionPlanComptable(): void {
        alert('À faire un joli modal');
    }
}