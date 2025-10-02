using API.Cases;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController(GetAllCitiesCase getAllCitiesCase, GetAllTypesCase getAllTypesCase) : ControllerBase
    {
        private readonly GetAllCitiesCase getAllCitiesCase = getAllCitiesCase;
        private readonly GetAllTypesCase getAllTypesCase = getAllTypesCase;

        [HttpPut]
        [Route("Search")]
        public IActionResult Search(HomeSearchRequest request)
        {
            return Ok();
        }

        [HttpGet]
        [Route("Types")]
        public IActionResult GetTypes()
        {
            var response = getAllTypesCase.Execute();
            return Ok(response);
        }

        [HttpGet]
        [Route("Cities")]
        public IActionResult GetCities()
        {
            var cities = getAllCitiesCase.Execute();

            return Ok(cities);
        }
    }

    public class HomeSearchRequest
    {
        public string Name { get; set; } = string.Empty;
        public IEnumerable<int>? Types { get; set; }
        public IEnumerable<int>? Cities { get; set; }
    }
}
