using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGA
{
    public class DtoTGA001InpDA01UtilisateurPourInscription
    {
        // page 1
        public string NomUtilisateur { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        // page 2
        public string NomDeFamille { get; set; }
        public string Prenom { get; set; }
        public string Adresse { get; set; }
        public string CodePostal { get; set; }
        public string Lieu { get; set; }
    }
}
