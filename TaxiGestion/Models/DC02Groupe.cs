using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC02Groupe
    {
        public int NoClient { get; set; }
        public int NoGroupe { get; set; }
        public string Texte { get; set; }
        public virtual List<DC10Compte> Compte { get; set; }
    }
}
