using System.Text.Json.Serialization;

namespace API.Repositories.Interfaces
{
    public interface ICityRepository
    {
        IEnumerable<GetCityDto> GetAll();
    }

    public class GetCityDto
    {
        [JsonPropertyName("code")]
        public string CityCode { get; set; } = string.Empty;

        [JsonPropertyName("name")]
        public string CityName { get; set; } = string.Empty;

        [JsonPropertyName("state")]
        public string State { get; set; } = string.Empty;
    }
}
