export interface DtoTGC001OutDC21EcritureForListColl {
    noEcriture: number;
    noCompteDebit?: number;
    desiCompteDebit: string;
    noCompteCredit?: number;
    desiCompteCredit: string;
    dateEcriture: Date;
    noPiece: number;
    debit: number;
    credit: number;
    solde: number;
    libelle1: string;
    libelle2: string;
    swImpressionExtourne: boolean;
}