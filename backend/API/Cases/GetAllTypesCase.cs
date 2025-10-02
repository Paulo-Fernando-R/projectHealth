using API.Repositories.Interfaces;

namespace API.Cases
{
    public class GetAllTypesCase(IUnitTypeRepository unitTypeRepository, IStablishmentTypeRepository stablishmentTypeRepository)
    {
        private readonly IUnitTypeRepository unitTypeRepository = unitTypeRepository;
        private readonly IStablishmentTypeRepository stablishmentTypeRepository = stablishmentTypeRepository;

        public IEnumerable<GetAllTypesResponse> Execute()
        {
            var units = unitTypeRepository.GetAll().Select(x => new GetAllTypesResponse
            {
                Description = x.TypeDescription,
                Id = x.TypeCode,
                Type = 1,
            });
            var stablishments = stablishmentTypeRepository.GetAll().Select(x => new GetAllTypesResponse
            {
                Description = x.TypeDescription,
                Id = x.TypeCode,
                Type = 2,
            });

            return units.Concat(stablishments);
        }
    }

    public class GetAllTypesResponse
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
