using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC10Compte
    {
        public int NoClient { get; set; }
        public int NoCompte { get; set; }

        public int NoClasse { get; set; }
        public int NoGroupe { get; set; }
        public int NoSousGroupe { get; set; }
        public string Texte { get; set; }
        public double SoldeAp { get; set; } // A faire en compute aussi peut être ???
        public virtual DC01Classe Classe { get; set; }
        public virtual DC02Groupe Groupe { get; set; }
        public virtual DC03SousGroupe SousGroupe { get; set; }
        public virtual List<DC21Ecriture> Ecriture { get; set; }
    }
}
