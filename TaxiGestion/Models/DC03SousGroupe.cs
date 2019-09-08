using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC03SousGroupe
    {
        public int NoClient { get; set; }
        public int NoSousGroupe { get; set; }
        public string Texte { get; set; }
        public virtual List<DC10Compte> Compte { get; set; }
    }
}
