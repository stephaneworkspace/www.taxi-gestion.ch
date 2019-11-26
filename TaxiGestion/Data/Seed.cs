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
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaxiGestion.Models;
using System.IO;

namespace TaxiGestion.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedDA01UtilisateurStephane(out int noUser, out int noClient)
        {
            /*
            var userData = File.ReadAllText("Data/Seed/DA01Utilisateur.json");
            var users = JsonConvert.DeserializeObject<List<DA01Utilisateur>>(userData);
            foreach (var user in users)
            {*/
            noUser = 0;
            noClient = 0;
            if (!_context.DA01Utilisateur.Any(x => x.NomUtilisateur == "stephane")) 
            // user.NomUtilisateur))
            {
                var client = new DA10Client()
                {
                    NomDeFamille = "Bressani",
                    Prenom = "Stéphane",
                    Adresse = "16A ch des Buclines",
                    CodePostal = "1224",
                };
                _context.DA10Client.Add(client);
                _context.SaveChanges();
                noClient = client.Id;
                var user = new DA01Utilisateur()
                {
                    NomUtilisateur = "stephane",
                    EMail = "s.bressani@bluewin.ch",
                    IdClient = client.Id
                };
                CreerMotDePasseHash("password", out byte[] passwordHash, out byte[] passwordSalt);
                user.MotDePasseHash = passwordHash;
                user.MotDePasseSalt = passwordSalt;
                user.NomUtilisateur = user.NomUtilisateur.ToLower();
                user.DateCreation = DateTime.Now;
                user.SwActive = true;
                user.SwActiveClient = true;
                user.SwEMailConfirmation = true;
                user.MotDePasseEMailConfirmation = "test1";
                _context.DA01Utilisateur.Add(user);
                _context.SaveChanges();
                client.UtilisateurAdminId = user.Id;
                _context.DA10Client.Update(client);
                _context.SaveChanges();
                noUser = user.Id;
            }
            //}
        }

        public void SeedDA01UtilisateurPedro(out int noUser, out int noClient)
        {
            /*
            var userData = File.ReadAllText("Data/Seed/DA01Utilisateur.json");
            var users = JsonConvert.DeserializeObject<List<DA01Utilisateur>>(userData);
            foreach (var user in users)
            {*/
            noUser = 0;
            noClient = 0;
            if (!_context.DA01Utilisateur.Any(x => x.NomUtilisateur == "pedro")) // user.NomUtilisateur))
            {
                var client = new DA10Client()
                {
                    NomDeFamille = "Pedroli",
                    Prenom = "Pedro",
                    Adresse = "1 rue de nule part",
                    CodePostal = "1228",
                };
                _context.DA10Client.Add(client);
                _context.SaveChanges();
                noClient = client.Id;
                var user = new DA01Utilisateur()
                {
                    NomUtilisateur = "pedro",
                    EMail = "steee-fx@hotmail.com",
                    IdClient = client.Id
                };
                CreerMotDePasseHash("password", out byte[] passwordHash, out byte[] passwordSalt);
                user.MotDePasseHash = passwordHash;
                user.MotDePasseSalt = passwordSalt;
                user.NomUtilisateur = user.NomUtilisateur.ToLower();
                user.DateCreation = DateTime.Now;
                user.SwActive = true;
                user.SwActiveClient = true;
                user.SwEMailConfirmation = true;
                user.MotDePasseEMailConfirmation = "test2";
                _context.DA01Utilisateur.Add(user);
                _context.SaveChanges();
                client.UtilisateurAdminId = user.Id;
                _context.DA10Client.Update(client);
                _context.SaveChanges();
                noUser = user.Id;
            }
            //}
        }

        private void CreerMotDePasseHash(
                    string motDePasse, 
                    out byte[] motDePasseHash, 
                    out byte[] motDePasseSalt
                )
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            motDePasseSalt = hmac.Key;
            motDePasseHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(motDePasse));
        }

        public void SeedDC01Classe(int noClient)
        {
            var data = File.ReadAllText("Data/Seed/DC01Classe.json", Encoding.GetEncoding("iso-8859-1"));
            var items = JsonConvert.DeserializeObject<List<DC01Classe>>(data);
            foreach (var item in items)
            {
                if (!_context.DC01Classe.Any(x => 
                            (x.NoClient == noClient) && (x.NoClasse == item.NoClasse))
                        )
                {
                    item.NoClient = noClient;
                    _context.DC01Classe.Add(item);
                }
            }
            _context.SaveChanges();
        }

        public void SeedDC02Groupe(int noClient)
        {
            var data = File.ReadAllText("Data/Seed/DC02Groupe.json", Encoding.GetEncoding("iso-8859-1"));
            var items = JsonConvert.DeserializeObject<List<DC02Groupe>>(data);
            foreach (var item in items)
            {
                if (!_context.DC02Groupe.Any(x => 
                            (x.NoClient == noClient) && (x.NoGroupe == item.NoGroupe))
                        )
                {
                    item.NoClient = noClient;
                    _context.DC02Groupe.Add(item);
                }
            }
            _context.SaveChanges();
        }

        public void SeedDC03SousGroupe(int noClient)
        {
            var data = File.ReadAllText("Data/Seed/DC03SousGroupe.json", 
                                        Encoding.GetEncoding("iso-8859-1"));
            var items = JsonConvert.DeserializeObject<List<DC03SousGroupe>>(data);
            foreach (var item in items)
            {
                if (!_context.DC03SousGroupe.Any(x => 
                            (x.NoClient == noClient) && (x.NoSousGroupe == item.NoSousGroupe))
                        )
                {
                    item.NoClient = noClient;
                    _context.DC03SousGroupe.Add(item);
                }
            }
            _context.SaveChanges();
        }

        public void SeedDC10Compte(int noClient)
        {
            var data = File.ReadAllText("Data/Seed/DC10Compte.json", Encoding.GetEncoding("iso-8859-1"));
            var items = JsonConvert.DeserializeObject<List<DC10Compte>>(data);
            foreach (var item in items)
            {
                if (!_context.DC10Compte.Any(x => 
                            (x.NoClient == noClient) && (x.NoCompte == item.NoCompte))
                        )
                {
                    item.NoClient = noClient;
                    _context.DC10Compte.Add(item);
                }
            }
            _context.SaveChanges();
        }

        public void SeedDC31EcritureCollectiveJournal(
                    int noClient, 
                    int noUtilisateur, 
                    string utilisateur
                )
        {
            var data = File.ReadAllText("Data/Seed/DC31EcritureCollectiveJournal"+ utilisateur + ".json",
                                        Encoding.GetEncoding("iso-8859-1"));
            var items = JsonConvert.DeserializeObject<List<DC31EcritureCollectiveJournal>>(data);
            foreach (var item in items)
            {
                // Attention pas de test si existe déjà... crée toujours plus d'écritures

                // Séparation DC30 / DC31
                var itemsDC30 = item.EcritureJournal;
                item.EcritureJournal = new List<DC30EcritureJournal>();

                // Préparation DC31
                item.NoClient = noClient;
                item.NoUtilisateur = noUtilisateur;
                // Increment - manuel pour clé composite
                var lastDC31 = _context.DC31EcritureCollectiveJournal
                    .Where(x => (x.NoClient == noClient) && (x.NoUtilisateur == noUtilisateur))
                    .OrderByDescending(x => x.NoEcritureCollectiveJournal)
                    .ToList();
                var nextDC31 = 0;
                foreach(var i in lastDC31)
                {
                    nextDC31 = i.NoEcritureCollectiveJournal;
                   break;
                }
                nextDC31++;
                item.NoEcritureCollectiveJournal = nextDC31;
                _context.DC31EcritureCollectiveJournal.Add(item);
                _context.SaveChanges();
                
                foreach (var itemDC30 in itemsDC30)
                {
                    // Préparation DC30
                    itemDC30.NoClient = noClient;
                    itemDC30.NoUtilisateur = noUtilisateur;
                    itemDC30.NoEcritureCollectiveJournal = item.NoEcritureCollectiveJournal;
                    // Increment - manuel pour clé composite
                    var lastDC30 = _context.DC30EcritureJournal
                        .Where(x => 
                                (x.NoClient == noClient) 
                                && (x.NoUtilisateur == noUtilisateur) 
                                && (x.NoEcritureCollectiveJournal == item.NoEcritureCollectiveJournal))
                        .OrderByDescending(x => x.NoEcritureJournal)
                        .ToList();
                    var nextDC30 = 0;
                    foreach (var i in lastDC30)
                    {
                        nextDC30 = i.NoEcritureJournal;
                        break;
                    }
                    nextDC30++;
                    itemDC30.NoEcritureJournal = nextDC30;
                    _context.DC30EcritureJournal.Add(itemDC30);
                    _context.SaveChanges();
                }
            }
        }
    }
}
