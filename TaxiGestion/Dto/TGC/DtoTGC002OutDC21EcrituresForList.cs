using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC002OutDC21EcrituresForList
    {
        public int NoClient { get; set; }
        public int NoEcritureCollective { get; set; }
        public int NoEcriture { get; set; }
        public int NoCompte { get; set; }
        public string DesiCompte { get; set; }
        public int ContrePartie { get; set; }
        public string DesiContrePartie { get; set; }
        public DateTime DateEcriture { get; set; }
        public int NoPiece { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double Solde { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
    }
}
