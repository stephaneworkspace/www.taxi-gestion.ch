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
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NSwag.Annotations;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Dto.TGA;
using TaxiGestion.Models;

namespace TaxiGestion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [OpenApiTag("TGA001Authentification", Description = "Authentification avec DA01User")]
    public class TGA001AuthentificationController : ControllerBase
    {
        private readonly IAuthentificationRepository _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly static TextInfo tinfo = CultureInfo.CurrentCulture.TextInfo;
        private readonly string[] _npa4Array = {
            "1201",
            "1202",
            "1203",
            "1204",
            "1205",
            "1206",
            "1207",
            "1208",
            "1209",
            "1212",
            "1213",
            "1213",
            "1214",
            "1216",
            "1217",
            "1218",
            "1219",
            "1220",
            "1222",
            "1223",
            "1224",
            "1225",
            "1226",
            "1227",
            "1228",
            "1231",
            "1232",
            "1234",
            "1236",
            "1237",
            "1239",
            "1241",
            "1242",
            "1243",
            "1244",
            "1245",
            "1246",
            "1247",
            "1248",
            "1251",
            "1252",
            "1253",
            "1254",
            "1255",
            "1256",
            "1257",
            "1258"
        };

        public TGA001AuthentificationController(IAuthentificationRepository repo, 
                                                IMapper mapper, 
                                                IConfiguration config)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config;
        }

        /// <summary>
        /// Cette méthode du controlleur permet l'inscription utilisateur DA01 + DA10
        /// L'utilisateur DA01 est l'unique maître de DA10
        /// 
        /// Cette méthode génère un e-mail pour confirmer l'identité de l'utilisateur
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("inscription")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(void), Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.BadRequest, 
                         typeof(string), 
                         Description = "L'utilisateur « Nom » existe déjà")]
        [SwaggerResponse(HttpStatusCode.BadRequest, 
                         typeof(string), 
                         Description = "L'e-mail « E-Mail » existe déjà")]
        public async Task<IActionResult> Inscription(DtoTGA001InpDA01UtilisateurPourInscription dto)
        {
            dto.NomUtilisateur = dto.NomUtilisateur.ToLower();
            if (await _repo.UtilisateurExiste(dto.NomUtilisateur))
                return BadRequest
                    ($"L'utilisateur « { tinfo.ToTitleCase(dto.NomUtilisateur) } » existe déjà");
            if (await _repo.EmailExiste(dto.Email))
                return BadRequest($"L'e-mail « { dto.Email } » existe déjà");
            if (!Array.Exists(this._npa4Array, x => x == dto.CodePostal))
                return BadRequest
                    ($"Le code postal « { dto.CodePostal } » n'est pas supporté par cette application");
            var userToCreate = new DA01Utilisateur
            {
                NomUtilisateur = dto.NomUtilisateur,
                EMail = dto.Email
            };
            var clientToCreate = new DA10Client
            {
                NomDeFamille = dto.NomDeFamille,
                Prenom = dto.Prenom,
                Adresse = dto.Adresse,
                CodePostal = dto.CodePostal
            };
            var userCreate = await _repo.Inscription(userToCreate, clientToCreate, dto.MotDePasse);

            using (var message = new MailMessage())
            {
                message.To.Add(new MailAddress(userCreate.EMail, 
                                    userCreate.Client.Prenom + " " + userCreate.Client.NomDeFamille));
                message.From = new MailAddress("info@taxi-gestion.ch", "Taxi Gestion");
                message.Subject = 
                    "TaxiGestion - Veuillez confirmer votre e-mail pour activer votre compte";
                string body = System.IO.File.ReadAllText("EMail/confirmation-email-client.html");
                body = body.Replace("#Prenom#", userCreate.Client.Prenom);
                body = body.Replace("#Nom#", userCreate.Client.NomDeFamille);
                body = body.Replace("#Url#", 
                        "https://www.taxi-gestion.ch/e-mail/confirmation-inscription/" 
                        + userCreate.Id + "/" + userCreate.MotDePasseEMailConfirmation);
                message.IsBodyHtml = true;
                message.Body = body;
                var client = new SmtpClient(_config.GetSection("Email:Smtp").Value);
                client.Port = Int32.Parse(_config.GetSection("Email:Port").Value);
                client.Send(message);
            }
            return Ok();
        }

        /// <summary>
        /// Login
        /// </summary>
        /// <param name="dto">Dto</param>
        /// <returns></returns>
        [HttpPost("login")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DtoDA01UserOutputForLoginReturn), Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.Unauthorized, 
                         typeof(string), 
                         Description = "Pas autorisé à se connecter")]
        [SwaggerResponse(HttpStatusCode.Unauthorized, 
                         typeof(string), 
                         Description = "L'e-mail n'a pas été validé")]
        public async Task<IActionResult> Login(DtoTGA001InpDA01UserForLogin dto)
        {
            var userFromRepo = await _repo.Login(dto.NomUtilisateur, dto.MotDePasse);
            if (userFromRepo == null)
                return Unauthorized("Pas autorisé à se connecter");
            if (userFromRepo.SwEMailConfirmation == false)
                return Unauthorized("L'e-mail n'a pas été validé");
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.NomUtilisateur)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        _config.GetSection("JWTSettings:Token").Value)
                    );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var loginDto = new DtoDA01UserOutputForLoginReturn
            {
                Token = tokenHandler.WriteToken(token),
                NomUtilisateur = userFromRepo.NomUtilisateur
            };
            return Ok(loginDto);
        }

        /// <summary>
        /// Vérification si le nom d'utilisateur (unique) est disponible
        /// </summary>
        /// <param name="dto">Dto</param>
        /// <returns></returns>
        [HttpPost("utilisateur-disponible")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Boolean), Description = "Ok")]
        public async Task<IActionResult> UtilisateurDisponible(DtoTGA001InpDA01UserForAvailable dto)
        {
            var swAvailable = await _repo.UtilisateurExiste(dto.NomUtilisateur);
            return Ok(!swAvailable);
        }

        /// <summary>
        /// Vérification si l'e-mail 
        /// (unique virtuelement, je laisse la possibilliter de bricoler) est disponible
        /// </summary>
        /// <param name="dto">Dto</param>
        /// <returns></returns>
        [HttpPost("email-disponible")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(Boolean), Description = "Ok")]
        public async Task<IActionResult> EMailDisponible(DtoTGA001InpDA01UserEmailForAvailable dto)
        {
            var swAvailable = await _repo.EmailExiste(dto.Email);
            return Ok(!swAvailable);
        }

        /// <summary>
        /// Activer le compte et tourne off le switch de confirmation d'e-mail
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpPost("email-confirmation-inscription/{idUtilisateur}/{code}")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription), 
                         Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(string), Description = "Code faux")]
        public async Task<IActionResult> EMailConfirmationInscription(int idUtilisateur, string code)
        {
            var item = await _repo.EMailConfirmation(idUtilisateur, code);
            if (item != null)
            {
                return Ok(_mapper.Map<DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription>(item));
            } 
            else
            {
                return BadRequest("Code non valide");
            }
        }
    }
}
