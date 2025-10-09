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
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetInfo(string susId)
        {
            var response = getByIdCase.Execute(susId);
            if (response == null) return NotFound();

            return Ok(response);
        }
    }
}
