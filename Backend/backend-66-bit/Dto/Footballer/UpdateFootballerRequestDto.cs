using backend_66_bit.Data.Entities;

namespace backend_66_bit.Dto.Footballer;

public class UpdateFootballerRequestDto
{
	public int FootballerId { get; set; }
	public string Name { get; set; } = null!;
	public string Surname { get; set; } = null!;
	public Gender Gender { get; set; }
	public DateOnly BirthDate { get; set; }
	public string Country { get; set; } = null!;
	public string TeamName { get; set; } = null!;
}