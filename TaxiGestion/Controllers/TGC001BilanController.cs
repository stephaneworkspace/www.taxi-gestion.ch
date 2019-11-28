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
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License version 2 as published by 
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for 
 * more details.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 *****************************************************************************/
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        public TGC001BilanController(IBilanRepository repo, 
                                     IAuthentificationRepository authRepo, 
                                     IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpGet("bilan-ecran")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(List<DtoTGC001OutDC10CompteForList>), 
                         Description = "Ok")]
        public async Task<IActionResult> GetPlanComptableComplet()
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.BilanEcran(noClient);
            var itemDto = _mapper.Map<List<DtoTGC001OutDC10CompteForList>>(item);
            return Ok(itemDto);
        }

        [HttpGet("ecritures-compte/{noCompte}")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(List<DtoTGC001OutDC21EcritureForList>), 
                         Description = "Ok")]
        public async Task<IActionResult> GetEcritures(int noCompte)
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var items = await _repo.EcrituresCompte(noCompte, noClient);
            var itemsDto = _mapper.Map<List<DtoTGC001OutDC21EcritureForList>>(items);
            return Ok(itemsDto);
        }

        [HttpGet("ecriture-collective/{noEcritureCollective}")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(List<DtoTGC001OutDC21EcritureForListColl>), 
                         Description = "Ok")]
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
