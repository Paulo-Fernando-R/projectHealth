using API.Cases;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController(GetAllCitiesCase getAllCitiesCase, GetAllTypesCase getAllTypesCase, SearchCase searchCase) : ControllerBase
    {
        private readonly GetAllCitiesCase getAllCitiesCase = getAllCitiesCase;
        private readonly GetAllTypesCase getAllTypesCase = getAllTypesCase;
        private readonly SearchCase searchCase = searchCase;

        [HttpPut]
        [Route("Search")]
        public IActionResult Search(HomeSearchRequest request)
        {
            var response = searchCase.Execute(request.Name, request.Types, request.Cities);
            return Ok(response);
        }

        [HttpGet]
        [Route("Types")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GetAllTypesResponse>))]
        public IActionResult GetTypes()
        {
            var response = getAllTypesCase.Execute();
            return Ok(response);
        }

        [HttpGet]
        [Route("Cities")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GetCityDto>))]
        public IActionResult GetCities()
        {
            var cities = getAllCitiesCase.Execute();

            return Ok(cities);
        }
    }

    public class HomeSearchRequest
    {
        public string Name { get; set; } = string.Empty;
        public IEnumerable<SearchTypeRequest> Types { get; set; } = [];
        public IEnumerable<string> Cities { get; set; } = [];
    }
}
