using API.Repositories.Interfaces;

namespace API.Cases
{
    public class GetAllCitiesCase(ICityRepository cityRepository)
    {
        private readonly ICityRepository cityRepository = cityRepository;

        public IEnumerable<GetCityDto> Execute()
        {
            var cities = cityRepository.GetAll();
            return cities;
        }
    }
}
