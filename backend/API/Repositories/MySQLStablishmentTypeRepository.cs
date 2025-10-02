using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLStablishmentTypeRepository(IDbConnection connection) : IStablishmentTypeRepository
    {
        private readonly IDbConnection connection = connection;

        public IEnumerable<GetStablishmentTypeDto> GetAll()
        {
            string sql = "SELECT * FROM stablishmenttype;";

            var dtos = connection.Query<GetStablishmentTypeDto>(sql);
            return dtos;
        }
    }
}
