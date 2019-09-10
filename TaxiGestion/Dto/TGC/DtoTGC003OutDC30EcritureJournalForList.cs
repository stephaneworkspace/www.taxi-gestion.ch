using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC003OutDC30EcritureJournalForList
    {
        public int NoEcritureCollectiveJournal { get; set; }
        public int NoEcritureJournal { get; set; }
        public int? NoCompteDebit { get; set; }
        public string DesiCompteDebit { get; set; }
        public int? NoCompteCredit { get; set; }
        public string DesiCompteCredit { get; set; }
        public DateTime DateEcriture { get; set; }
        public int NoPiece { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
        public double Montant { get; set; }
        public bool SwAutomatique { get; set; }
    }
}
