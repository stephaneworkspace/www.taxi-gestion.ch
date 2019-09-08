using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DA10Client
    {
        public int Id { get; set; }
        // 1 seul administrateur par entité client
        // seul cet utilisateur peut créer des comptes
        // il peut aussi activer/desactiver les comptes
        // Vu que c'est une application comptable low-cost pour une utilisation peu poussée
        // je ne vois pas l'intéret de faire un journal par utilisateur
        // mais rien ne m'empeche de voir plus loin et d'avoir une structure solide
        public int? UtilisateurAdminId { get; set; } // ne change jamais est en int? car je ne peux pas créer 2 id à la fois auto-incr DA01 et DA10
        public string NomDeFamille { get; set; }
        public string Prenom { get; set; }
        public string Adresse { get; set; }
        public string CodePostal { get; set; }
        public string Lieu { get; set; }
        [ForeignKey("UtilisateurAdminId")]
        public virtual DA01Utilisateur UtilisateurAdmin { get; set; }
        public virtual List<DA01Utilisateur> UtilisateurClient { get; set; }
    }
}
