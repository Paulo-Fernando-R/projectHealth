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

        public string GetUniType(int code)
        {
            string sql = "SELECT typeDescription FROM unittype WHERE typeCode = @code";
            object data = new
            {
                code,
            };

            var response = connection.QueryFirst<string>(sql, data);
            return response;
        }
    }
}
