using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC30EcritureJournal
    {
        public int NoClient { get; set; }
        public int NoUtilisateur { get; set; }
        public int NoEcritureCollectiveJournal { get; set; }
        public int NoEcritureJournal { get; set; }

        public int? NoCompteDebit { get; set; }
        public int? NoCompteCredit { get; set; }
        public int NoPiece { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
        public double Montant { get; set; }
        public bool SwAutomatique { get; set; }
        public virtual DC31EcritureCollectiveJournal EcritureCollectiveJournal { get; set; }
        public virtual DC10Compte CompteDebit { get; set; }
        public virtual DC10Compte CompteCredit { get; set; }
    }
}
