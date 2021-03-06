﻿/******************************************************************************
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

        public TGZ001AffichageController(IAffichageRepository repo, 
                                         IAuthentificationRepository autoRepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = autoRepo;
            _mapper = mapper;
        }

        [HttpGet("comptes")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(List<DtoTGZ001OutDC10CompteForList>), 
                         Description = "Ok")]
        public async Task<IActionResult> GetPlanComptableComplet()
        {
            var noUser = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var noClient = await _authRepo.NoClient(noUser);
            var item = await _repo.AffichageCompte(noClient);
            var itemDto = _mapper.Map<List<DtoTGZ001OutDC10CompteForList>>(item);
            return Ok(itemDto);
        }
    }
}
