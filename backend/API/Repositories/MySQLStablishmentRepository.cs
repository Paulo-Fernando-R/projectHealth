using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLStablishmentRepository(IDbConnection connection) : IStablishmentRepository
    {
        private readonly IDbConnection connection = connection;

        public IEnumerable<dynamic> Search(string? name, IEnumerable<int>? unitCodes, IEnumerable<int>? stablishmentCodes, IEnumerable<string>? cityCodes)
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
SELECT * 
FROM stablishment
WHERE IF(@name IS NULL, TRUE, fantasyName LIKE '%{name}%')
    AND IF (@units IS NULL, TRUE, unitTypeCode IN ('{units}'))
    AND IF (@stablishments IS NULL, TRUE, stablishmentTypeCode IN ('{stablishments}'))
    AND IF (@cities IS NULL, TRUE, cityCode IN ('{cities}'))
LIMIT 100;
";

            var data = new
            {
                name,
                units,
                stablishments,
                cities
            };

            return connection.Query(sql, data);
        }
    }
}
