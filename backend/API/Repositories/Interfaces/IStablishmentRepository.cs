namespace API.Repositories.Interfaces
{
    public interface IStablishmentRepository
    {
        IEnumerable<SearchStablishmentDto> Search(string? name, IEnumerable<int>? unitCodes, IEnumerable<int>? stablishmentCodes, IEnumerable<string>? cityCodes, int skip, int limit);
        GetStablishmentInfoDto? GetBySusId(string susId);
    }

    public abstract class StablishmentDto
    {
        public string SusId { get; set; } = string.Empty;
        public string FantasyName { get; set; } = string.Empty;
        public string AddressNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string AddressDistrict { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    public class GetStablishmentInfoDto : StablishmentDto
    {
        public string CityName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
    }

    public class SearchStablishmentDto : StablishmentDto
    {
        public string CityName { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
    }
}
