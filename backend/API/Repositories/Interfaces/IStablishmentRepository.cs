namespace API.Repositories.Interfaces
{
    public interface IStablishmentRepository
    {
        IEnumerable<dynamic> Search(string? name, IEnumerable<int>? unitCodes, IEnumerable<int>? stablishmentCodes, IEnumerable<string>? cityCodes);
    }
}
