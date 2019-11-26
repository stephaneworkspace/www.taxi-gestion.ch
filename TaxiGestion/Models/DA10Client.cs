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
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *****************************************************************************/
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
