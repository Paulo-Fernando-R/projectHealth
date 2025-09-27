using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
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
    }
}
