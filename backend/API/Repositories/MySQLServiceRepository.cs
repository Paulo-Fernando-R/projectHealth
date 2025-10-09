using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLServiceRepository(IDbConnection connection) : IServiceRepository
    {
        private readonly IDbConnection connection = connection;

        public IEnumerable<string> GetByStablishment(string susId)
        {
            string sql = @"
SELECT serviceDescription 
FROM service AS s
INNER JOIN stablishmentservice AS ss ON ss.serviceCode = s.serviceCode
WHERE stablishmentSusId = @susId;
";
            object data = new
            {
                susId,
            };

            var response = connection.Query<string>(sql, data);
            return response;
        }
    }
}
