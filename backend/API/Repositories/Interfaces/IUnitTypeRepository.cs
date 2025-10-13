namespace API.Repositories.Interfaces
{
    public interface IUnitTypeRepository
    {
        IEnumerable<GetUniTypeDto> GetAll();
        string GetUniType(int code);
    }

    public class GetUniTypeDto
    {
        public int TypeCode { get; set; }
        public string TypeDescription { get; set; } = string.Empty;
    }
}
