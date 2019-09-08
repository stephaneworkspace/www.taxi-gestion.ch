using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGZ
{
    public class DtoTGZ001OutDB10CompteForList
    {
        public int NoClient { get; set; }
        public int NoClasse { get; set; }
        public int NoGroupe { get; set; }
        public int NoSousGroupe { get; set; }
        public string Texte { get; set; }
        public double Solde1 { get; set; }
        public double Solde2 { get; set; } 
        public double Solde1Plus2 { get; set; }
    }
}
