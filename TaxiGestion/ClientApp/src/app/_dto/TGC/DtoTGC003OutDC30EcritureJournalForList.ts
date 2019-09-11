export interface DtoTGC003OutDC30EcritureJournalForList {
    noEcritureCollectiveJournal: number,
    noEcritureJournal: number,
    noCompteDebit?: number,
    desiCompteDebit: string,
    noCompteCredit?: number,
    desiCompteCredit: string,
    dateEcriture: Date,
    noPiece: number,
    libelle1: string,
    libelle2: string,
    // a faire libellé débit/crédit
    montant: number,
    swAutomatique: boolean
}
export interface DtoTGC003OutDC30EcritureJournalForListMod {
    noSort: string
    noEcritureCollectiveJournal: number,
    noEcritureJournal: number,
    noEcritureJournalMod: string,
    noCompteDebit?: number,
    desiCompteDebit: string,
    desiCompteDebitMod: string,
    noCompteCredit?: number,
    desiCompteCredit: string,
    desiCompteCreditMod: string,
    dateEcriture: Date,
    dateEcritureMoment: string,
    noPiece: number,
    libelle1: string,
    libelle2: string,
    // a faire libellé débit/crédit
    montant: number,
    montantString: number,
    debit: number,
    debitString: string,
    credit: number,
    creditString: string,
    swAutomatique: boolean
}