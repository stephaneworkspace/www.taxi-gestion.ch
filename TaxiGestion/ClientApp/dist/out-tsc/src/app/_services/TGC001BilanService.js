var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import numeral from 'numeral';
import * as moment from 'moment';
numeral.register('locale', 'fr-ch', {
    delimiters: {
        thousands: '\'',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'CHF'
    }
});
// switch between locales
numeral.locale('fr-ch'); // http://numeraljs.com/#custom-formats fr-ch
//numeral.defaultFormat('0,0[.]00 $');
// moment
moment.locale('fr-ch');
let TGC001BilanService = class TGC001BilanService {
    // headers_fix;
    constructor(http) {
        this.http = http;
        this.baseUrl = environment.apiUrl;
        // Headers
        this.httpOptions = {};
    }
    setHeaders() {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
        /*
        this.headers_fix = new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        });*/
    }
    getPlanComptable() {
        this.setHeaders();
        return this.http.get(this.baseUrl + 'TGC001Bilan/bilan-ecran', this.httpOptions);
    }
    getEcritures(noCompte) {
        this.setHeaders();
        return this.http.get(this.baseUrl + 'TGC001Bilan/ecritures-compte/' + noCompte, this.httpOptions);
    }
    getEcrituresCollective(noEcritureCollective) {
        this.setHeaders();
        return this.http.get(this.baseUrl + 'TGC001Bilan/ecriture-collective/' + noEcritureCollective, this.httpOptions);
    }
    /**
     * Compute Bilan / Exploitation
     * @param classes
     */
    computeTotalBilan(classes) {
        let total = {
            debit: 0,
            credit: 0,
            solde: 0,
            debitString: numeral(0).format('0,0.00 $'),
            creditString: numeral(0).format('0,0.00 $'),
            soldeString: numeral(0).format('0,0.00 $'),
        };
        classes.forEach(classe => {
            total.debit += classe.debit;
            total.credit += classe.credit;
            total.solde += classe.solde;
            total.debitString = numeral(total.debit).format('0,0.00 $');
            total.creditString = numeral(total.credit).format('0,0.00 $');
            total.soldeString = numeral(total.solde).format('0,0.00 $');
        });
        return total;
    }
    /**
     * Compute Array SubGroup of "PlanComptable"
     * @param dto
     */
    computeClasse(dto) {
        let classesFinal;
        classesFinal = new Array();
        let classes;
        classes = new Array();
        // Compte Classes without Groupe/SousGroupe/Compte
        dto.forEach(item => {
            if (classes == null || !classes.find(x => x.noClasse == item.noClasse)) {
                let newClasse = {
                    noClasse: item.noClasse,
                    texte: item.nomClasse,
                    groupes: [],
                    debit: 0,
                    credit: 0,
                    solde: 0,
                    debitString: '',
                    creditString: '',
                    soldeString: ''
                };
                classes.push(newClasse);
            }
        });
        classes.forEach(classe => {
            let groupes;
            groupes = new Array();
            dto.forEach(item => {
                if (classe.noClasse == item.noClasse) {
                    if (!groupes.find(x => x.noGroupe == item.noGroupe)) {
                        let newGroupe = {
                            noGroupe: item.noGroupe,
                            texte: item.nomGroupe,
                            sousGroupes: [],
                            debit: 0,
                            credit: 0,
                            solde: 0,
                            debitString: '',
                            creditString: '',
                            soldeString: ''
                        };
                        groupes.push(newGroupe);
                    }
                }
            });
            let newClasse = {
                noClasse: classe.noClasse,
                texte: classe.texte,
                groupes: groupes.slice(),
                debit: classe.debit,
                credit: classe.credit,
                solde: classe.solde,
                debitString: classe.debitString,
                creditString: classe.creditString,
                soldeString: classe.soldeString
            };
            classesFinal.push(newClasse);
        });
        // Il manque sous-groupe
        classes = new Array();
        classes = classesFinal.slice();
        classesFinal = new Array(); // reset
        classes.forEach(classe => {
            let groupes;
            groupes = new Array();
            classe.groupes.forEach(groupe => {
                let sousGroupes;
                sousGroupes = new Array();
                dto.forEach(item => {
                    if (classe.noClasse == item.noClasse && groupe.noGroupe == item.noGroupe) {
                        if (!sousGroupes.find(x => x.noSousGroupe == item.noSousGroupe)) {
                            let newSousGroupe = {
                                noSousGroupe: item.noSousGroupe,
                                texte: item.nomSousGroupe,
                                comptes: [],
                                debit: 0,
                                credit: 0,
                                solde: 0,
                                debitString: '',
                                creditString: '',
                                soldeString: ''
                            };
                            sousGroupes.push(newSousGroupe);
                        }
                    }
                });
                let newGroupe = {
                    noGroupe: groupe.noGroupe,
                    texte: groupe.texte,
                    sousGroupes: sousGroupes.slice(),
                    debit: groupe.debit,
                    credit: groupe.credit,
                    solde: groupe.solde,
                    debitString: groupe.debitString,
                    creditString: groupe.creditString,
                    soldeString: groupe.soldeString
                };
                groupes.push(newGroupe);
            });
            let newClasse = {
                noClasse: classe.noClasse,
                texte: classe.texte,
                groupes: groupes.slice(),
                debit: classe.debit,
                credit: classe.credit,
                solde: classe.solde,
                debitString: classe.debitString,
                creditString: classe.creditString,
                soldeString: classe.soldeString
            };
            classesFinal.push(newClasse);
        });
        // Il manque les comptes desormais
        classes = new Array();
        classes = classesFinal.slice();
        classesFinal = new Array(); // reset
        classes.forEach(classe => {
            let groupes;
            groupes = new Array();
            classe.groupes.forEach(groupe => {
                let sousGroupes;
                sousGroupes = new Array();
                groupe.sousGroupes.forEach(sousGroupe => {
                    let comptes;
                    comptes = new Array();
                    dto.forEach(item => {
                        if (classe.noClasse == item.noClasse && groupe.noGroupe == item.noGroupe && sousGroupe.noSousGroupe == item.noSousGroupe) {
                            if (!comptes.find(x => x.noCompte == item.noCompte)) {
                                let newCompte = {
                                    noCompte: item.noCompte,
                                    texte: item.texte,
                                    debit: item.solde1 >= 0 ? item.solde1 : 0,
                                    credit: item.solde1 >= 0 ? 0 : (item.solde1 * -1),
                                    solde: item.solde1,
                                    debitString: numeral(item.solde1 >= 0 ? item.solde1 : 0).format('0,0.00 $'),
                                    creditString: numeral(item.solde1 >= 0 ? 0 : (item.solde1 * -1)).format('0,0.00 $'),
                                    soldeString: numeral(item.solde1).format('0,0.00 $'),
                                };
                                comptes.push(newCompte);
                            }
                            ;
                        }
                    });
                    // foreach monétaire ici
                    let debitComptesTotal = 0.0;
                    let creditComptesTotal = 0.0;
                    let soldeComptesTotal = 0.0;
                    comptes.forEach(compte => {
                        debitComptesTotal += compte.debit;
                        creditComptesTotal += compte.credit;
                        soldeComptesTotal += compte.solde;
                    });
                    let newSousGroupe = {
                        noSousGroupe: sousGroupe.noSousGroupe,
                        texte: sousGroupe.texte,
                        comptes: comptes.slice(),
                        debit: debitComptesTotal,
                        credit: creditComptesTotal,
                        solde: soldeComptesTotal,
                        debitString: numeral(debitComptesTotal).format('0,0.00 $'),
                        creditString: numeral(creditComptesTotal).format('0,0.00 $'),
                        soldeString: numeral(soldeComptesTotal).format('0,0.00 $')
                    };
                    sousGroupes.push(newSousGroupe);
                });
                // foreach monétaire ici
                let debitSousGroupesTotal = 0.0;
                let creditSousGroupesTotal = 0.0;
                let soldeSousGroupesTotal = 0.0;
                sousGroupes.forEach(sousGroupe => {
                    debitSousGroupesTotal += sousGroupe.debit;
                    creditSousGroupesTotal += sousGroupe.credit;
                    soldeSousGroupesTotal += sousGroupe.solde;
                });
                let newGroupe = {
                    noGroupe: groupe.noGroupe,
                    texte: groupe.texte,
                    sousGroupes: sousGroupes.slice(),
                    debit: debitSousGroupesTotal,
                    credit: creditSousGroupesTotal,
                    solde: soldeSousGroupesTotal,
                    debitString: numeral(debitSousGroupesTotal).format('0,0.00 $'),
                    creditString: numeral(creditSousGroupesTotal).format('0,0.00 $'),
                    soldeString: numeral(soldeSousGroupesTotal).format('0,0.00 $') // ici changer
                };
                groupes.push(newGroupe);
            });
            // foreach monétaire ici
            let debitGroupesTotal = 0.0;
            let creditGroupesTotal = 0.0;
            let soldeGroupesTotal = 0.0;
            groupes.forEach(groupe => {
                debitGroupesTotal += groupe.debit;
                creditGroupesTotal += groupe.credit;
                soldeGroupesTotal += groupe.solde;
            });
            let newClasse = {
                noClasse: classe.noClasse,
                texte: classe.texte,
                groupes: groupes.slice(),
                debit: debitGroupesTotal,
                credit: creditGroupesTotal,
                solde: soldeGroupesTotal,
                debitString: numeral(debitGroupesTotal).format('0,0.00 $'),
                creditString: numeral(creditGroupesTotal).format('0,0.00 $'),
                soldeString: numeral(soldeGroupesTotal).format('0,0.00 $') // ici changer
            };
            classesFinal.push(newClasse);
        });
        // Set currency from dto
        // numeral(CURRENCY HERE).format('0,0[.]00 $')
        return classesFinal;
    }
    /**
     * Compute Array Ecriture
     * @param dto
     */
    computeEcriture(dto) {
        let ecrituresFinal;
        ecrituresFinal = new Array();
        dto.forEach(item => {
            let newEcriture = {
                noEcritureCollective: item.noEcritureCollective,
                noEcriture: item.noEcriture,
                noCompte: item.noCompte,
                desiCompte: item.desiCompte,
                contrePartie: item.contrePartie,
                desiContrePartie: item.desiContrePartie,
                dateEcriture: item.dateEcriture,
                dateEcritureMoment: moment(item.dateEcriture).format("L"),
                noPiece: item.noPiece,
                debit: item.debit,
                credit: item.credit,
                solde: item.solde,
                libelle: item.libelle2 == '' ? item.libelle1 : item.libelle1 + '<br />' + item.libelle2,
                swImpressionExtourne: item.swImpressionExtourne,
                noJournal: item.noJournal,
                dateJournalisation: item.dateJournalisation,
                dateJournalisationMoment: moment(item.dateJournalisation).format("L"),
                debitString: numeral(item.debit).format('0,0.00 $'),
                creditString: numeral(item.credit).format('0,0.00 $'),
                soldeString: numeral(item.solde).format('0,0.00 $'),
                swEcritureCollective: item.swEcritureCollective
            };
            ecrituresFinal.push(newEcriture);
        });
        return ecrituresFinal;
    }
    /**
     * Compute Array Ecriture Collective
     * @param dto DtoDB21EcrituresJournalOutputForList
     */
    computeEcritureCollective(dto) {
        let ecrituresFinal;
        ecrituresFinal = new Array();
        dto.forEach(item => {
            let newEcriture = {
                noEcriture: item.noEcriture,
                noCompteDebit: item.noCompteDebit,
                desiCompteDebit: item.desiCompteDebit,
                noCompteCredit: item.noCompteCredit,
                desiCompteCredit: item.desiCompteCredit,
                dateEcriture: item.dateEcriture,
                dateEcritureMoment: moment(item.dateEcriture).format("L"),
                noPiece: item.noPiece,
                debit: item.debit,
                credit: item.credit,
                solde: item.solde,
                libelle: item.libelle2 == '' ? item.libelle1 : item.libelle1 + '<br />' + item.libelle2,
                swImpressionExtourne: item.swImpressionExtourne,
                debitString: numeral(item.debit).format('0,0.00 $'),
                creditString: numeral(item.credit).format('0,0.00 $'),
                soldeString: numeral(item.solde).format('0,0.00 $'),
            };
            ecrituresFinal.push(newEcriture);
        });
        return ecrituresFinal;
    }
    computeEcritureCollectiveMontant(dto) {
        let debit = 0;
        let credit = 0;
        let solde = 0;
        dto.forEach(item => {
            debit += item.debit;
            credit += item.credit;
            solde += item.solde;
        });
        let newEcriture = {
            debit: debit,
            credit: credit,
            solde: solde,
            debitString: numeral(debit).format('0,0.00 $'),
            creditString: numeral(credit).format('0,0.00 $'),
            soldeString: numeral(solde).format('0,0.00 $'),
        };
        return newEcriture;
    }
};
TGC001BilanService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], TGC001BilanService);
export { TGC001BilanService };
//# sourceMappingURL=TGC001BilanService.js.map