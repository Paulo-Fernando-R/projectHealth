namespace API.Repositories.Interfaces
{
    public interface IOpeningHoursRepository
    {
        IEnumerable<GetOpeningHoursDto> GetAllByStablishment(string susId);
    }

    public class GetOpeningHoursDto
    {
        public int DayCode { get; set; }
        public string StartHour { get; set; } = string.Empty;
        public string EndHour { get; set; } = string.Empty;
    }
}
