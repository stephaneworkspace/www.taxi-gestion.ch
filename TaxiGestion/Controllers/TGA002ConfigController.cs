using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [OpenApiTag("TGA002Config", Description = "Config")]
    public class TGA002ConfigController
    {
        private readonly IMapper _mapper;
        public TGA002ConfigController(IMapper mapper)
        {
            _mapper = mapper;
        }
    }
}