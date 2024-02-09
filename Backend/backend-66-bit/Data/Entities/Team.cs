using System.ComponentModel.DataAnnotations;

namespace backend_66_bit.Data.Entities;

public class Team
{
	public int TeamId { get; set; }
	[MaxLength(100)] public string TeamName { get; set; } = null!;

	public IList<Footballer> Footballers { get; set; } = new List<Footballer>();
}