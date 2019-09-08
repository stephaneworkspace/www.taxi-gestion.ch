using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC31EcritureCollectiveJournal
    {
        public int NoClient { get; set; }
        public int NoUtilisateur { get; set; }
        public int NoEcritureCollectiveJournal { get; set; }

        public DateTime DateEcriture { get; set; }
        public virtual List<DC30EcritureJournal> EcritureJournal { get; set; }
    }
}
