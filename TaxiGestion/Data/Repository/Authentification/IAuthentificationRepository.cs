using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Dto.TGA;
using TaxiGestion.Models;

namespace TaxiGestion.Data.Repository.Authentification
{
    public interface IAuthentificationRepository
    {
        Task<DA01Utilisateur> Login(string nomUtilisateur, string motDePasse);
        Task<DA01Utilisateur> Inscription(DA01Utilisateur record, DA10Client recordClient, string motDePasse);
        Task<bool> UtilisateurExiste(string nomUtilisateur);
        Task<bool> EmailExiste(string email);
        Task<DA01Utilisateur> EMailConfirmation(int id, string motDePasseEMailConfirmation);
        Task<int> NoClient(int idUtilisateur);
    }
}
