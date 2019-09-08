using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TaxiGestion.Dto.TGA;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Authentification
{
    public class AuthentificationRepository : IAuthentificationRepository
    {
        private readonly DataContext _context;

        public AuthentificationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<DA01Utilisateur> Login(string nomUtilisateur, string password)
        {
            var user = await _context.DA01Utilisateur.FirstOrDefaultAsync(x => x.NomUtilisateur == nomUtilisateur);
            if (user == null)
            {
                return null;
            }
            if (!VerificationMotDePasseHash(password, user.MotDePasseHash, user.MotDePasseSalt))
            {
                return null;
            }
            return user;
        }

        private bool VerificationMotDePasseHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        /// <summary>
        /// Création d'une compte client et utilisateur
        /// </summary>
        /// <param name="record">Donnée nom d'utilisateur</param>
        /// <param name="motDePasse">Mot de passe</param>
        /// <returns></returns>
        public async Task<DA01Utilisateur> Inscription(DA01Utilisateur record, DA10Client recordClient, string motDePasse)
        {
            var recordDA10 = new DA10Client()
            {
                NomDeFamille = recordClient.NomDeFamille,
                Prenom = recordClient.Prenom,
                Adresse = recordClient.Adresse,
                CodePostal = recordClient.CodePostal
            };
            await _context.DA10Client.AddAsync(recordDA10);
            await _context.SaveChangesAsync();
            record.IdClient = recordDA10.Id;
            record.SwActiveClient = false;
            record.SwActive = false;
            record.SwEMailConfirmation = false;
            record.DateCreation = DateTime.Now;
            CreerMotDePasseHash(motDePasse, out byte[] motDePasseHash, out byte[] motDePasseSalt);
            record.MotDePasseHash = motDePasseHash;
            record.MotDePasseSalt = motDePasseSalt;
            record.DateCreation = DateTime.Now;
            using (SHA512 sha512Hash = SHA512.Create())
            {
                byte[] sourceBytes = Encoding.UTF8.GetBytes(record.DateCreation.ToString());
                byte[] hashBytes = sha512Hash.ComputeHash(sourceBytes);
                record.MotDePasseEMailConfirmation = BitConverter.ToString(hashBytes).Replace("-", String.Empty);
            }
            await _context.DA01Utilisateur.AddAsync(record);
            await _context.SaveChangesAsync();
            recordDA10.UtilisateurAdminId = record.Id;
            _context.DA10Client.Update(recordDA10);
            await _context.SaveChangesAsync();
            return await _context.DA01Utilisateur.FirstOrDefaultAsync(x => x.Id == record.Id);
        }

        private void CreerMotDePasseHash(string motDePasse, out byte[] motDePasseHash, out byte[] motDePasseSalt)
        {
            using var hmac = new HMACSHA512();
            motDePasseSalt = hmac.Key;
            motDePasseHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(motDePasse));
        }

        public async Task<bool> UtilisateurExiste(string nomUtilisateur)
        {
            if (await _context.DA01Utilisateur.AnyAsync(x => x.NomUtilisateur == nomUtilisateur))
                return true;
            return false;
        }

        public async Task<bool> EmailExiste(string email)
        {
            if (await _context.DA01Utilisateur.AnyAsync(x => x.EMail == email))
                return true;
            return false;
        }

        public async Task<DA01Utilisateur> EMailConfirmation(int id, string motDePasseEMailConfirmation)
        {
            var item = await _context.DA01Utilisateur.FirstOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                if (item.MotDePasseEMailConfirmation == motDePasseEMailConfirmation)
                {
                    if (motDePasseEMailConfirmation == "")
                        return null;
                    // record.SwActiveClient = false; 100 écriture gratuit, après reste false
                    item.SwActive = false;
                    item.SwEMailConfirmation = true;
                    item.MotDePasseEMailConfirmation = "";
                    _context.DA01Utilisateur.Update(item);
                    await _context.SaveChangesAsync();
                    // Compta
                    // Classes
                    var dataDC01 = File.ReadAllText("Data/Repository/Json/DC01Classe.json", Encoding.GetEncoding("iso-8859-1"));
                    var itemsDC01 = JsonConvert.DeserializeObject<List<DC01Classe>>(dataDC01);
                    foreach (var itemDC01 in itemsDC01)
                    {
                        if (!_context.DC01Classe.Any(x => (x.NoClient == item.IdClient) && (x.NoClasse == itemDC01.NoClasse)))
                        {
                            itemDC01.NoClient = item.IdClient;
                            await _context.DC01Classe.AddAsync(itemDC01);
                        }
                    }
                    await _context.SaveChangesAsync();
                    // Groupe
                    var dataDC02 = File.ReadAllText("Data/Repository/Json/DC02Groupe.json", Encoding.GetEncoding("iso-8859-1"));
                    var itemsDC02 = JsonConvert.DeserializeObject<List<DC02Groupe>>(dataDC02);
                    foreach (var itemDC02 in itemsDC02)
                    {
                        if (!_context.DC02Groupe.Any(x => (x.NoClient == item.IdClient) && (x.NoGroupe == itemDC02.NoGroupe)))
                        {
                            itemDC02.NoClient = item.IdClient;
                            await _context.DC02Groupe.AddAsync(itemDC02);
                        }
                    }
                    await _context.SaveChangesAsync();
                    // Sous-groupe
                    var dataDC03 = File.ReadAllText("Data/Repository/Json/DC03SousGroupe.json", Encoding.GetEncoding("iso-8859-1"));
                    var itemsDC03 = JsonConvert.DeserializeObject<List<DC03SousGroupe>>(dataDC03);
                    foreach (var itemDC03 in itemsDC03)
                    {
                        if (!_context.DC03SousGroupe.Any(x => (x.NoClient == item.IdClient) && (x.NoSousGroupe == itemDC03.NoSousGroupe)))
                        {
                            itemDC03.NoClient = item.IdClient;
                            await _context.DC03SousGroupe.AddAsync(itemDC03);
                        }
                    }
                    await _context.SaveChangesAsync();
                    // Compte
                    var dataDC10 = File.ReadAllText("Data/Repository/Json/DC10Compte.json", Encoding.GetEncoding("iso-8859-1"));
                    var itemsDC10 = JsonConvert.DeserializeObject<List<DC10Compte>>(dataDC10);
                    foreach (var itemDC10 in itemsDC10)
                    {
                        if (!_context.DC10Compte.Any(x => (x.NoClient == item.IdClient) && (x.NoCompte == itemDC10.NoCompte)))
                        {
                            itemDC10.NoClient = item.IdClient;
                            await _context.DC10Compte.AddAsync(itemDC10);
                        }
                    }
                    await _context.SaveChangesAsync();
                    item = await _context.DA01Utilisateur.FirstOrDefaultAsync(x => x.Id == id);
                    return item;
                }
            }
            return null;
        }

        public async Task<int> NoClient(int idUtilisateur)
        {
            var item = await _context.DA01Utilisateur.FirstOrDefaultAsync(x => x.Id == idUtilisateur);
            var client = await _context.DA10Client.FirstOrDefaultAsync(x => x.Id == item.IdClient);
            return client.Id;
        }
    }
}
