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

        public IEnumerable<dynamic> Execute(string name, IEnumerable<SearchTypeRequest> types, IEnumerable<string> cities)
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

            return stablishmentRepository.Search(value, unitCodes, stablishmentCodes, cityCodes);
        }
    }
}
