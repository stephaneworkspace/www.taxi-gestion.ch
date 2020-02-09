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
export interface DtoTGC003OutDC30EcritureJournalForList {
  noEcritureCollectiveJournal: number;
  noEcritureJournal: number;
  noCompteDebit?: number;
  desiCompteDebit: string;
  noCompteCredit?: number;
  desiCompteCredit: string;
  dateEcriture: Date;
  noPiece: number;
  libelle1: string;
  libelle2: string;
  // a faire libellé débit/crédit
  montant: number;
  swAutomatique: boolean;
}
export interface DtoTGC003OutDC30EcritureJournalForListMod {
  noSort: string;
  noEcritureCollectiveJournal: number;
  noEcritureJournal: number;
  noEcritureJournalMod: string;
  noCompteDebit?: number;
  desiCompteDebit: string;
  desiCompteDebitMod: string;
  noCompteCredit?: number;
  desiCompteCredit: string;
  desiCompteCreditMod: string;
  dateEcriture: Date;
  dateEcritureMoment: string;
  noPiece: number;
  libelle1: string;
  libelle2: string;
  // a faire libellé débit/crédit
  montant: number;
  montantString: number;
  debit: number;
  debitString: string;
  credit: number;
  creditString: string;
  swAutomatique: boolean;
}
