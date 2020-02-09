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
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Data.Repository.Comptabilite;
using TaxiGestion.Dto.TGC;

namespace TaxiGestion.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [OpenApiTag("TGC003SaisieEcritures", Description = "Saisie écritures comptable avant journalisation")]
    public class TGC003SaisieEcrituresController : ControllerBase
    {
        private readonly IGestionEcritureJournalRepository _repo;
        private readonly IAuthentificationRepository _authRepo;
        private readonly IMapper _mapper;

        public TGC003SaisieEcrituresController(IGestionEcritureJournalRepository repo, 
                                               IAuthentificationRepository authRepo, 
                                               IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpGet("liste-des-ecritures")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(List<DtoTGC003OutDC30EcritureJournalForList>), 
                         Description = "Ok")]
        public async Task<IActionResult> GetPlanComptableComplet()
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.ListeEnAttenteDeJournalisation(noClient, noUser);
            var itemDto = _mapper.Map<List<DtoTGC003OutDC30EcritureJournalForList>>(item);
            return Ok(itemDto);
        }

        [HttpPost("saisie-ecriture-simple")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(void), Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.BadRequest, 
                         typeof(string), 
                         Description = "Impossible de créer l'écriture dans le journal")]
        [SwaggerResponse(HttpStatusCode.BadRequest, 
                         typeof(string), 
                         Description = "Compte identique interdit")]
        public async Task<IActionResult> PostSaisieEcritureSimple
        (DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple dto)
        {
            if (dto.NoCompteDebit == dto.NoCompteCredit)
                return BadRequest("Compte identique interdit");
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.SaisieEcritureSimple(noClient, noUser, dto);
            if (item != null)
                return Ok();
            else
                return BadRequest("Impossible de créer l'écriture dans le journal");
        }
    }
}
