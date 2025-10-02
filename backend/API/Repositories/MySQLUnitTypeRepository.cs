using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLUnitTypeRepository(IDbConnection connection) : IUnitTypeRepository
    {
        private readonly IDbConnection connection = connection;

        public IEnumerable<GetUniTypeDto> GetAll()
        {
            string sql = "SELECT * FROM unittype;";

            var dtos = connection.Query<GetUniTypeDto>(sql);
            return dtos;
        }
    }
}
