using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC001OutDC10CompteForList
    {
        public int NoCompte { get; set; }
        public int NoClasse { get; set; }
        public string NomClasse { get; set; }
        public int NoGroupe { get; set; }
        public string NomGroupe { get; set; }
        public int NoSousGroupe { get; set; }
        public string NomSousGroupe { get; set; }
        public string Texte { get; set; }
        public double Solde1 { get; set; } // Solde calculé Année en cours
        public double Solde2 { get; set; } // Solde Ap
    }
}
