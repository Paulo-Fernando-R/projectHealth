using API.Cases;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController(GetAllCitiesCase getAllCitiesCase) : ControllerBase
    {
        private readonly GetAllCitiesCase getAllCitiesCase = getAllCitiesCase;

        [HttpPut]
        [Route("Search")]
        public IActionResult Search()
        {
            return Ok();
        }

        [HttpGet]
        [Route("Types")]
        public IActionResult GetTypes()
        {
            return Ok();
        }

        [HttpGet]
        [Route("Cities")]
        public IActionResult GetCities()
        {
            var cities = getAllCitiesCase.Execute();

            return Ok(cities);
        }
    }
}
