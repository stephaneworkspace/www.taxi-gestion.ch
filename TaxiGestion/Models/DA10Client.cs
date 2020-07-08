/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; the source ode is released under and Creative 
 * Commons License.
 * 
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int? UtilisateurAdminId { get; set; } // ne change jamais est en int? 
                                                     // car je ne peux pas créer 2 id à la fois a
                                                     // auto-incr DA01 et DA10
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
