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
    [OpenApiTag("TGC002Journalisation", Description = "Journalisation")]
    public class TGC002JournalisationController : ControllerBase
    {
        private readonly IJournalisationRepository _repo;
        private readonly IAuthentificationRepository _authRepo;
        private readonly IMapper _mapper;

        public TGC002JournalisationController(IJournalisationRepository repo, 
                                              IAuthentificationRepository authRepo, 
                                              IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpPost("journaliser")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(DtoTGC002OutDC20JournalForRead), 
                         Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.BadRequest, 
                         typeof(string), 
                         Description = "Impossible de journaliser un journal vide")]
        public async Task<IActionResult> PostJournaliser() // (DtoTGC002InpDC20JournalForCreate dto)
        {
            var dto = new DtoTGC002InpDC20JournalForCreate()
            {
                DateCompta = DateTime.Now
            };
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            if (!await _repo.SwJournalisation(noClient, noUser))
                return BadRequest("Impossible de journaliser un journal vide");
            var items = await _repo.Journalisation(dto, noClient, noUser);
            var itemsDto = _mapper.Map<DtoTGC002OutDC20JournalForRead>(items);
            return Ok(itemsDto);
        }
    }
}
