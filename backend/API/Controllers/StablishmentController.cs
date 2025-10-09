using API.Cases;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StablishmentController(GetBySusIdCase getByIdCase) : ControllerBase
    {
        private readonly GetBySusIdCase getByIdCase = getByIdCase;

        [HttpGet]
        [Route("{susId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetStablishmentBySusIdResponse))]
        public IActionResult GetInfo(string susId)
        {
            var response = getByIdCase.Execute(susId);
            return Ok(response);
        }
    }
}
