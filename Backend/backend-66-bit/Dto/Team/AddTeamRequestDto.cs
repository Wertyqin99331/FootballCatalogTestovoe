using System.ComponentModel.DataAnnotations;

namespace backend_66_bit.Dto.Team;

public class AddTeamRequestDto
{
	[Required]
	public string TeamName { get; set; } = null!;
}