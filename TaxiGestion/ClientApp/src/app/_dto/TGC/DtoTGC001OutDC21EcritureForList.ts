export interface DtoTGC001OutDC21EcritureForList {
    noEcritureCollective: number;
    noEcriture: number;
    noCompte: number;
    desiCompte: string;
    contrePartie: number;
    desiContrePartie: string;
    dateEcriture: Date;
    noPiece: number;
    debit: number;
    credit: number;
    solde: number;
    libelle1: string;
    libelle2: string;
    swImpressionExtourne: boolean;
    noJournal: number;
    dateJournalisation: Date;
    swEcritureCollective: boolean;
}