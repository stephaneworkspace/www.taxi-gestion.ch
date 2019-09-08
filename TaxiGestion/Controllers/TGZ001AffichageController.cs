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
using TaxiGestion.Data.Repository.Affichage;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Dto.TGZ;

namespace TaxiGestion.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [OpenApiTag("TGZ001Affichage", Description = "Affichage")]
    public class TGZ001AffichageController : ControllerBase
    {
        private readonly IAffichageRepository _repo;
        private readonly IAuthentificationRepository _authRepo;
        private readonly IMapper _mapper;

        public TGZ001AffichageController(IAffichageRepository repo, IAuthentificationRepository autoRepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = autoRepo;
            _mapper = mapper;
        }

        [HttpGet("comptes")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DtoTGZ001OutDB10CompteForList>), Description = "Ok")]
        public async Task<IActionResult> GetPlanComptableComplet()
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.AffichageCompte(noClient);
            var itemDto = _mapper.Map<List<DtoTGZ001OutDB10CompteForList>>(item);
            return Ok(itemDto);
        }
    }
}