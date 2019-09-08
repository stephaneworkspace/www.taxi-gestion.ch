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
        public double Montant { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
    }
}
