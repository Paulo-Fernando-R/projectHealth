namespace API.Repositories.Interfaces
{
    public interface IStablishmentTypeRepository
    {
        IEnumerable<GetStablishmentTypeDto> GetAll();
    }

    public class GetStablishmentTypeDto
    {
        public int TypeCode {  get; set; }
        public string TypeDescription { get; set; } = string.Empty;
    }
}
