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
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
