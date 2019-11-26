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
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
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

        public TGA002ConfigController(IConfigRepository repo, 
                                      IAuthentificationRepository authRepo, 
                                      IMapper mapper)
        {
            _repo = repo;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpGet("config")]
        [SwaggerResponse(HttpStatusCode.OK, 
                         typeof(DtoTGA002OutDA21ConfigForSelect), 
                         Description = "Ok")]
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
        [SwaggerResponse(HttpStatusCode.BadRequest, 
                         typeof(string), 
                         Description = "Impossible de configuer les données de base")]
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
