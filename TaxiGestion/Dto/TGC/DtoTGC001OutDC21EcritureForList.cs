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

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC001OutDC21EcritureForList
    {
        public int NoEcritureCollective { get; set; }
        public int NoEcriture { get; set; }
        public int NoCompte { get; set; }
        public string DesiCompte { get; set; }
        public int ContrePartie { get; set; }
        public string DesiContrePartie { get; set; }
        public DateTime DateEcriture { get; set; }
        public int NoPiece { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double Solde { get; set; }
        public string Libelle1 { get; set; }
        public string Libelle2 { get; set; }
        public bool SwImpressionExtourne { get; set; }
        public int NoJournal { get; set; }
        public DateTime DateJournalisation { get; set; }
        public bool SwEcritureCollective { get; set; }
    }
}
