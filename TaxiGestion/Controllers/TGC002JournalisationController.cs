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
using TaxiGestion.Models;

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

        public TGC002JournalisationController(IJournalisationRepository repo, IAuthentificationRepository authRepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpPost("journaliser")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DtoTGC002OutDC20JournalForRead), Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(string), Description = "Impossible de journaliser un journal vide")]
        public async Task<IActionResult> PostJournaliser(DtoTGC002InpDC20JournalForCreate dto)
        {
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