using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLStablishmentRepository(IDbConnection connection) : IStablishmentRepository
    {
        private readonly IDbConnection connection = connection;

        public GetStablishmentInfoDto? GetBySusId(string susId)
        {
            string sql = @"
SELECT susId, fantasyName, addressNumber, address, addressDistrict, phone, c.cityName, c.state, s.latitude, s.longitude, unitTypeCode, stablishmentTypeCode, contractWithSus   
FROM stablishment AS s
LEFT JOIN city AS c ON c.cityCode = s.cityCode 
WHERE s.susId = @susId";
            object data = new
            {
                susId,
            };

            var response = connection.QueryFirstOrDefault<GetStablishmentInfoDto>(sql, data);
            return response;
        }

        public IEnumerable<SearchStablishmentDto> Search(string? name, IEnumerable<int>? unitCodes, IEnumerable<int>? stablishmentCodes, IEnumerable<string>? cityCodes, int skip, int limit)
        {
            string? units = null;
            if (unitCodes != null)
                units = string.Join(", ", unitCodes);

            string? stablishments = null;
            if (stablishmentCodes != null)
                stablishments = string.Join(", ", stablishmentCodes);

            string? cities = null;
            if (cityCodes != null)
                cities = string.Join(", ", cityCodes);

            string sql = @$"
SELECT susId, fantasyName, addressNumber, address, addressDistrict, phone, c.cityName, c.state
FROM stablishment AS s
LEFT JOIN city AS c ON c.cityCode = s.cityCode
WHERE IF(@name IS NULL, TRUE, fantasyName LIKE '%{name}%')
    AND IF (@units IS NULL, TRUE, unitTypeCode IN ('{units}'))
    AND IF (@stablishments IS NULL, TRUE, stablishmentTypeCode IN ('{stablishments}'))
    AND IF (@cities IS NULL, TRUE, s.cityCode IN ('{cities}'))
LIMIT @limit 
OFFSET @skip;
";

            var data = new
            {
                name,
                units,
                stablishments,
                cities,
                limit,
                skip
            };

            return connection.Query<SearchStablishmentDto>(sql, data);
        }
    }
}
