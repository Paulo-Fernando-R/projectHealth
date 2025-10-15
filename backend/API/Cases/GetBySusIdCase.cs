using API.GenericResponses;
using API.Repositories.Interfaces;

namespace API.Cases
{
    public class GetBySusIdCase(IStablishmentRepository stablishmentRepository, IServiceRepository serviceRepository, IUnitTypeRepository unitTypeRepository, IStablishmentTypeRepository stablishmentTypeRepository, IOpeningHoursRepository openingHoursRepository)
    {
        private readonly IStablishmentRepository stablishmentRepository = stablishmentRepository;
        private readonly IServiceRepository serviceRepository = serviceRepository;
        private readonly IUnitTypeRepository unitTypeRepository = unitTypeRepository;
        private readonly IStablishmentTypeRepository stablishmentTypeRepository = stablishmentTypeRepository;
        private readonly IOpeningHoursRepository openingHoursRepository = openingHoursRepository;

        private IEnumerable<int> PUBLIC_STABLISHMENTS_CODE = [1015, 1023, 1031, 1104, 1112, 1120, 1139, 1147, 1155, 1252, 1260, 1279, 2011, 2038, 1201, 1210, 1228, 1244, 1287, 1295, 1309, 1317, 1325, 1333];

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

            bool contractWithSus = stablishment.ContractWithSus.Equals("S", StringComparison.CurrentCultureIgnoreCase);

            var unitType = unitTypeRepository.GetUniType(stablishment.UnitTypeCode);
            var stablishmentType = stablishmentTypeRepository.GetStablishmentType(stablishment.StablishmentTypeCode);

            var openingHours = openingHoursRepository.GetAllByStablishment(stablishment.SusId).Select(x =>
            {
                string day = string.Empty;
                switch (x.Day)
                {
                    case 1:
                        day = "Domingo";
                        break;
                    case 2:
                        day = "Segunda-feira";
                        break;
                    case 3:
                        day = "Terça-feira";
                        break;
                    case 4:
                        day = "Quarta-feira";
                        break;
                    case 5:
                        day = "Quinta-feira";
                        break;
                    case 6:
                        day = "Sexta-feira";
                        break;
                    case 7:
                        day = "Sábado";
                        break;
                }

                return new GetStablishmentOpeningHourBySusIdResponse
                {
                    Day = day,
                    EndHour = x.EndHour,
                    StartHour = x.StartHour,
                };
            });

            var response = new GetStablishmentBySusIdResponse
            {
                SusId = susId,
                IsPublic = PUBLIC_STABLISHMENTS_CODE.Contains(stablishment.LegalNatureCode),
                Address = address,
                Email = stablishment.Email,
                FantasyName = stablishment.FantasyName,
                Phone = stablishment.Phone,
                Services = services,
                Geoposition = geoposition,
                UnitType = unitType,
                StablishmentType = stablishmentType,
                ContractWithSus = contractWithSus,
                NatureDescription = stablishment.NatureDescription,
                OpeningHours = openingHours,
            };

            return response;
        }
    }

    public class GetStablishmentBySusIdResponse
    {
        public string SusId { get; set; } = string.Empty;
        public bool ContractWithSus { get; set; }
        public bool IsPublic { get; set; }
        public string FantasyName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UnitType { get; set; } = string.Empty;
        public string StablishmentType { get; set; } = string.Empty;
        public string NatureDescription { get; set; } = string.Empty;
        public required AddressResponse Address { get; set; }
        public IEnumerable<string> Services { get; set; } = [];
        public IEnumerable<GetStablishmentOpeningHourBySusIdResponse> OpeningHours { get; set; } = [];
        public GetStablishmentGeopositionBySusIdResponse? Geoposition { get; set; }
    }

    public class GetStablishmentGeopositionBySusIdResponse
    {
        public string Latitude { get; set; } = string.Empty;
        public string Longitude { get; set; } = string.Empty;
    }

    public class GetStablishmentOpeningHourBySusIdResponse
    {
        public string Day { get; set; } = string.Empty;
        public string StartHour {  get; set; } = string.Empty;
        public string EndHour { get; set; } = string.Empty;
    }
}
