namespace API.Repositories.Interfaces
{
    public interface IStablishmentTypeRepository
    {
        IEnumerable<GetStablishmentTypeDto> GetAll();
        string GetStablishmentType(int code);
    }

    public class GetStablishmentTypeDto
    {
        public int TypeCode {  get; set; }
        public string TypeDescription { get; set; } = string.Empty;
    }
}
