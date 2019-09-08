using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DC01Classe
    {
        public int NoClient { get; set; }
        public int NoClasse { get; set; }
        public string Texte { get; set; }
        public virtual List<DC10Compte> Compte { get; set; }
    }
}
