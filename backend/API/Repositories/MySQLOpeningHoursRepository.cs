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
            string sql = "SELECT * FROM openinghours WHERE stablishmentSusId = @susId";
            object data = new
            {
                susId,
            };

            var dtos = connection.Query<GetOpeningHoursDto>(sql, data);
            return dtos;
        }
    }
}
