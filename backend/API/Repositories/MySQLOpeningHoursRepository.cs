using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLOpeningHoursRepository(IDbConnection connection) : IOpeningHoursRepository
    {
        private readonly IDbConnection connection = connection;

        public IEnumerable<GetOpeningHoursDto> GetAllByStablishment(string susId)
        {
            string sql = $"SELECT CAST(dayCode AS UNSIGNED) AS Day, startHour, endHour FROM openinghours WHERE stablishmentSusId = '{susId}'";

            var dtos = connection.Query<GetOpeningHoursDto>(sql);
            return dtos;
        }
    }
}
