using backend_66_bit.Data.Entities;

namespace backend_66_bit.Dto.Footballer;

public class GetFootballersResponseDto
{
	public required List<FootballerDto> Footballers { get; set; }
}

public class FootballerDto
{
	public required int FootballerId { get; set; }
	public required string Name { get; set; }
	public required string Surname { get; set; }
	public required Gender Gender { get; set; }
	public required DateOnly BirthDate { get; set; }
	public required string Country { get; set; }
	public required string TeamName { get; set; }
}