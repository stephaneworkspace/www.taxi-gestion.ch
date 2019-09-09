using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple
    {
        public int NoCompteDebit { get; set; }
        public int NoCompteCredit { get; set; }
        public DateTime DateEcriture { get; set; }
        public int NoPiece { get; set; }
        public DateTime DatePiece { get; set; }
        public double Montant { get; set; }
        public string Libelle1Debit { get; set; }
        public string Libelle2Debit { get; set; }
        public string Libelle1Credit { get; set; }
        public string Libelle2Credit { get; set; }
    }
}
