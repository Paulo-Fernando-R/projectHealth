namespace API.Repositories.Interfaces
{
    public interface IStablishmentRepository
    {
        IEnumerable<SearchDto> Search(string? name, IEnumerable<int>? unitCodes, IEnumerable<int>? stablishmentCodes, IEnumerable<string>? cityCodes, int skip, int limit);
    }

    public class SearchDto
    {
        public string SusId { get; set; } = string.Empty;
        public string FantasyName { get;set; } = string.Empty;
        public string AddressNumber { get;set; } = string.Empty;
        public string Address { get;set; } = string.Empty;
        public string AddressDistrict { get;set; } = string.Empty;
        public string Phone { get;set; } = string.Empty;
        public string CityName { get;set; } = string.Empty;
        public string State { get;set; } = string.Empty;
    }
}
