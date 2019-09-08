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

        public TGC003SaisieEcrituresController(IGestionEcritureJournalRepository repo, IAuthentificationRepository authRepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpGet("liste-des-ecritures")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DtoTGC003OutDC30EcritureJournalForList>), Description = "Ok")]
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
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(string), Description = "Impossible de créer l'écriture dans le journal")]
        public async Task<IActionResult> PostSaisieEcritureSimple(DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple dto)
        {
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