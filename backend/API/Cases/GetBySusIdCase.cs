using API.GenericResponses;
using API.Repositories.Interfaces;

namespace API.Cases
{
    public class GetBySusIdCase(IStablishmentRepository stablishmentRepository, IServiceRepository serviceRepository, IUnitTypeRepository unitTypeRepository)
    {
        private readonly IStablishmentRepository stablishmentRepository = stablishmentRepository;
        private readonly IServiceRepository serviceRepository = serviceRepository;
        private readonly IUnitTypeRepository unitTypeRepository = unitTypeRepository;

        public GetStablishmentBySusIdResponse? Execute(string susId)
        {
            var stablishment = stablishmentRepository.GetBySusId(susId);
            if (stablishment == null) return null;

            var services = serviceRepository.GetByStablishment(stablishment.SusId);

            var address = new AddressResponse
            {
                Address = stablishment.Address,
                District = stablishment.AddressDistrict,
                Number = stablishment.AddressNumber,
                City = stablishment.CityName,
                State = stablishment.State,
            };

            GetStablishmentGeopositionBySusIdResponse? geoposition = null;
            if (!string.IsNullOrEmpty(stablishment.Latitude) && !string.IsNullOrEmpty(stablishment.Longitude))
            {
                geoposition = new GetStablishmentGeopositionBySusIdResponse
                {
                    Latitude = stablishment.Latitude,
                    Longitude = stablishment.Longitude
                };
            }

            var unitType = unitTypeRepository.GetUniType(stablishment.UnitTypeCode);

            var response = new GetStablishmentBySusIdResponse
            {
                SusId = susId,
                Address = address,
                Email = stablishment.Email,
                FantasyName = stablishment.FantasyName,
                Phone = stablishment.Phone,
                Services = services,
                Geoposition = geoposition,
                UnitType = unitType
            };

            return response;
        }
    }

    public class GetStablishmentBySusIdResponse
    {
        public string SusId { get; set; } = string.Empty;
        public string FantasyName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UnitType {  get; set; } = string.Empty;
        public required AddressResponse Address {  get; set; }
        public IEnumerable<string> Services { get; set; } = [];
        public GetStablishmentGeopositionBySusIdResponse? Geoposition { get; set; }
    }

    public class GetStablishmentGeopositionBySusIdResponse
    {
        public string Latitude { get; set; } = string.Empty;
        public string Longitude { get; set; } = string.Empty;
    }
}
