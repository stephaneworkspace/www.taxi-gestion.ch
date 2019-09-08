using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Models
{
    public class DA01Utilisateur
    {
        public int Id { get; set; }
        public int IdClient { get; set; }
        public bool SwActiveClient { get; set; } // utilisateur activé par admin de IdEntiteClient
        public string NomUtilisateur { get; set; }
        public byte[] MotDePasseHash { get; set; }
        public byte[] MotDePasseSalt { get; set; }
        public string EMail { get; set; }
        public string MotDePasseEMailConfirmation { get; set; } // à implémenter plus tard
        public bool SwEMailConfirmation { get; set; } // à implémenter plus tard
        public bool SwActive { get; set; } // à implémenter plus tard
        public DateTime DateCreation { get; set; }
        [ForeignKey("IdClient")]
        public virtual DA10Client Client { get; set; }
    }
}
