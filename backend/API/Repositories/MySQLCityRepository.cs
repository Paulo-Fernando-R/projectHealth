using API.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace API.Repositories
{
    public class MySQLCityRepository : ICityRepository
    {
        private IDbConnection connection;

        public MySQLCityRepository(IDbConnection connection)
        {
            this.connection = connection;
        }

        public IEnumerable<GetCityDto> GetAll()
        {
            var res = connection.Query<GetCityDto>("SELECT cityCode, cityName, state FROM city");
            return res;
        }
    }
}
