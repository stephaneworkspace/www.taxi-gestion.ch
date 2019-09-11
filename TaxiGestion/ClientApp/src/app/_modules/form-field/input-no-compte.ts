import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroupDirective, FormGroup, Validators } from "@angular/forms";
import { compteValidator } from "src/app/_validator/function/compteValide.validator";
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
    @Input() groupNoCompte: FormGroup;
    @Input() fbNoCompte: string;
    @Input() groupCompte: FormGroup;
    @Input() fbCompte: string;
    @Input() planComptable: DtoDC10[];
    private _touch: Boolean;
    get touch(): Boolean {
        // transform value for display
        return this._touch;
      }
    @Input()
    set touch(touch: Boolean) {
        // console.log('prev value: ', this._touch);
        // console.log('got name: ', touch);
        this._touch = touch;
        if (touch)
            this.groupNoCompte.get(this.fbNoCompte).markAsTouched();

    }
    @Output() output: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

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
        this.groupNoCompte.get(this.fbNoCompte).setValidators(Validators.compose([Validators.required, Validators.minLength(6), compteValidator(this.planComptable6String)]));
        this.groupCompte.get(this.fbCompte).disable();
        // Autocomplète
        this.filteredOptions = this.groupNoCompte.get(this.fbNoCompte).valueChanges
        .pipe(
            startWith(''),
            map(val => this.filter(val))
        );
        // OnChange n°
        this.groupNoCompte.get(this.fbNoCompte).valueChanges.subscribe(val => {
            // Sécurité à 6 charactères
            let swOk = false;
            if (val.length > 6) {
                this.groupNoCompte.get(this.fbNoCompte).setValue(val.slice(0, 6));
                swOk = true;
            }
            // Texte d'erreur si le validator en décide ainsi
            this.matErrorNoCompte = "« " + val + " » faux";
            // Trouver le compte et changer le placeholder
            if (val.length == 6 || swOk) {
                let swChange = false;
                this.planComptable.forEach(element => {
                    if (element.noCompte.toString() == val.slice(0, 6)) {
                        swChange = true;
                        this.placeholderNoCompte = "N° compte";
                        this.placeholderCompte = "Désignation";
                        this.groupCompte.get(this.fbCompte).setValue(element.texte);
                    }
                });
                if (swChange == false) {
                    this.placeholderNoCompte = "N°";
                    this.placeholderCompte = "Compte";
                    this.groupCompte.get(this.fbCompte).setValue('');
                }
            } else {
                this.placeholderNoCompte = "N°";
                this.placeholderCompte = "Compte";
                this.groupCompte.get(this.fbCompte).setValue('');
            }
            this.output.emit(this.groupNoCompte);
        });
    }

    filter(val): string[] {
        return this.planComptableString.filter(option => option.indexOf(val) === 0);
    }

    selectionPlanComptable(): void {
        alert('À faire');
    }
}