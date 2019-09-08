using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC001OutDC21EcritureForListColl
    {
        public int NoEcriture { get; set; }
        public int? NoCompteDebit { get; set; }
        public string DesiCompteDebit { get; set; }
        public int? NoCompteCredit { get; set; }
        public string DesiCompteCredit { get; set; }
        public DateTime DateEcriture { get; set; }
        public int NoPiece { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double Solde { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
        public bool SwImpressionExtourne { get; set; }
    }
}
