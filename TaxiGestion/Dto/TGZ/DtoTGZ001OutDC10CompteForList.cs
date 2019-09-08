using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGZ
{
    public class DtoTGZ001OutDC10CompteForList
    {
        public int NoCompte { get; set; }
        public string Texte { get; set; }
        public double Solde1 { get; set; }
        public double Solde2 { get; set; } 
        public double Solde1Plus2 { get; set; }
    }
}
