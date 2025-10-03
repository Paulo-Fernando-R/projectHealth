using API.Enums;
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
                TypeCode = x.TypeCode,
                Type = TypeEnum.Unit,
            });
            var stablishments = stablishmentTypeRepository.GetAll().Select(x => new GetAllTypesResponse
            {
                Description = x.TypeDescription,
                TypeCode = x.TypeCode,
                Type = TypeEnum.Stablishment,
            });

            return units.Concat(stablishments);
        }
    }

    public class GetAllTypesResponse
    {
        public int TypeCode { get; set; }
        public TypeEnum Type { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
