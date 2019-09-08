using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC22EcritureCollective
    {
        public int NoClient { get; set; }
        public int NoEcritureCollective { get; set; }

        public DateTime DateEcriture { get; set; }
        public int NoJournal { get; set; }
        public virtual List<DC21Ecriture> Ecriture { get; set; }
        public virtual DC20Journal Journal { get; set; }
    }
}
