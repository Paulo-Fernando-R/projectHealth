namespace API.Repositories.Interfaces
{
    public interface IServiceRepository
    {
        IEnumerable<string> GetByStablishment(string susId);
    }
}
