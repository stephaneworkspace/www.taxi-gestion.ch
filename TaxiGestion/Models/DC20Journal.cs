using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC20Journal
    {
        public int NoClient { get; set; }
        public int NoJournal { get; set; }

        public DateTime DateJournalisation { get; set; }
        public virtual List<DC21Ecriture> Ecriture { get; set; }
        public virtual List<DC22EcritureCollective> EcritureCollective { get; set; }
    }
}
