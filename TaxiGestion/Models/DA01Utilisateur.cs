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
using System;
using System.ComponentModel.DataAnnotations.Schema;

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
