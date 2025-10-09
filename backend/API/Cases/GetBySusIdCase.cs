using API.GenericResponses;
using API.Repositories.Interfaces;

namespace API.Cases
{
    public class GetBySusIdCase(IStablishmentRepository stablishmentRepository, IServiceRepository serviceRepository)
    {
        private readonly IStablishmentRepository stablishmentRepository = stablishmentRepository;
        private readonly IServiceRepository serviceRepository = serviceRepository;

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

            var response = new GetStablishmentBySusIdResponse
            {
                SusId = susId,
                Address = address,
                Email = stablishment.Email,
                FantasyName = stablishment.FantasyName,
                Phone = stablishment.Phone,
                Services = services,
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
        public required AddressResponse Address {  get; set; }
        public IEnumerable<string> Services { get; set; } = [];
    }
}
