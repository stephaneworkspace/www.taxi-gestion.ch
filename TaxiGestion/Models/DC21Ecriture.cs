using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC21Ecriture
    {
        public int NoClient { get; set; }
        public int NoEcritureCollective { get; set; }
        public int NoEcriture { get; set; }

        public int NoCompte { get; set; }
        public int? ContrePartie { get; set; }
        public int NoPiece { get; set; }
        public double MontantDebit { get; set; }
        public double MontantCredit { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
        public bool SwImpressionExtourne { get; set; }
        public int NoJournal { get; set; }
        public virtual DC20Journal Journal { get; set; }
        public virtual DC22EcritureCollective EcritureCollective { get; set; }
        public virtual DC10Compte Compte { get; set; }
        public virtual DC10Compte CompteContrePartie { get; set; }
    }
}
