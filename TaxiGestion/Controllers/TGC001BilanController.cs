using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Security.Claims;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Data.Repository.Comptabilite;
using TaxiGestion.Dto.TGC;

namespace TaxiGestion.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [OpenApiTag("TGC001Bilan", Description = "Bilan")]
    public class TGC001BilanController : ControllerBase
    {
        private readonly IBilanRepository _repo;
        private readonly IAuthentificationRepository _authRepo;
        private readonly IMapper _mapper;

        public TGC001BilanController(IBilanRepository repo, IAuthentificationRepository authRepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpGet("bilan-ecran")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DtoTGC001OutDC10CompteForList>), Description = "Ok")]
        public async Task<IActionResult> GetPlanComptableComplet()
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.BilanEcran(noClient);
            var itemDto = _mapper.Map<List<DtoTGC001OutDC10CompteForList>>(item);
            return Ok(itemDto);
        }

        [HttpGet("ecritures-compte/{noCompte}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DtoTGC001OutDC21EcritureForList>), Description = "Ok")]
        public async Task<IActionResult> GetEcritures(int noCompte)
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var items = await _repo.EcrituresCompte(noCompte, noClient);
            var itemsDto = _mapper.Map<List<DtoTGC001OutDC21EcritureForList>>(items);
            return Ok(itemsDto);
        }

        [HttpGet("ecriture-collective/{noEcritureCollective}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DtoTGC001OutDC21EcritureForListColl>), Description = "Ok")]
        public async Task<IActionResult> GetEcrituresCollective(int noEcritureCollective)
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var items = await _repo.EcritureCollective(noEcritureCollective, noClient);
            var itemsDto = _mapper.Map<List<DtoTGC001OutDC21EcritureForListColl>>(items);
            return Ok(itemsDto);
        }
    }
}