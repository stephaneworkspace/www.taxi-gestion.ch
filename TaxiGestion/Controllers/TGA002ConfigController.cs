using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Security.Claims;
using TaxiGestion.Data.Repository.Config;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Dto.TGA;

namespace TaxiGestion.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [OpenApiTag("TGA002Config", Description = "Config")]
    public class TGA002ConfigController : ControllerBase
    {
        private readonly IConfigRepository _repo;
        private readonly IAuthentificationRepository _authRepo;
        private readonly IMapper _mapper;

        public TGA002ConfigController(IConfigRepository repo, IAuthentificationRepository authRepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpGet("config")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DtoTGA002OutDA21ConfigForSelect), Description = "Ok")]
        public async Task<IActionResult> GetConfig()
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.PeriodeComptaEnCours(noClient);
            var itemDto = _mapper.Map<DtoTGA002OutDA21ConfigForSelect>(item);
            return Ok(itemDto);
        }

        [HttpPost("config")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(void), Description = "Ok")]
        [SwaggerResponse(HttpStatusCode.BadRequest, typeof(string), Description = "Impossible de configuer les données de base")]
        public async Task<IActionResult> PostConfig(DtoTGA002InpDA21ConfigForWrite dto)
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var newRecord = await _repo.WritePeriodeComptaEncours(noClient, dto);
            if (newRecord == null)
                return BadRequest("Impossible de configuer les données de base");
            else
                return Ok();
        }
    }
}