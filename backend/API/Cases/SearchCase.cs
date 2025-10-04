using API.Enums;
using API.Repositories.Interfaces;

namespace API.Cases
{
    public class SearchTypeRequest
    {
        public TypeEnum Type { get; set; }
        public int TypeCode { get; set; }
    }

    public class SearchCase(IStablishmentRepository stablishmentRepository)
    {
        private readonly IStablishmentRepository stablishmentRepository = stablishmentRepository;

        public IEnumerable<SearchResponse> Execute(string name, IEnumerable<SearchTypeRequest> types, IEnumerable<string> cities)
        {
            string? value = name;
            if (string.IsNullOrEmpty(value))
                value = null;

            IEnumerable<int>? unitCodes = null;
            if (types.Any(x => x.Type == TypeEnum.Unit))
                unitCodes = types.Where(x => x.Type == TypeEnum.Unit).Select(x => x.TypeCode);

            IEnumerable<int>? stablishmentCodes = null;
            if (types.Any(x => x.Type == TypeEnum.Stablishment))
                stablishmentCodes = types.Where(x => x.Type == TypeEnum.Stablishment).Select(x => x.TypeCode);

            var cityCodes = cities.Any() ? cities : null;

            return stablishmentRepository.Search(value, unitCodes, stablishmentCodes, cityCodes).Select(x =>
            {
                var address = new SearchAddressResponse
                {
                    Address = x.Address,
                    District = x.AddressDistrict,
                    Number = x.AddressNumber,
                    City = x.CityName,
                    State = x.State
                };

                var phone = string.IsNullOrEmpty(x.Phone) ? null : x.Phone;

                return new SearchResponse
                {
                    Address = address,
                    FantasyName = x.FantasyName,
                    Phone = phone,
                    SusId = x.SusId,
                };
            });
        }
    }

    public class SearchResponse
    {
        public string SusId { get; set; } = string.Empty;
        public string FantasyName { get; set; } = string.Empty;
        public required SearchAddressResponse Address { get; set; }
        public string? Phone { get; set; } = string.Empty;
    }

    public class SearchAddressResponse
    {
        public string Number { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
    }
}
