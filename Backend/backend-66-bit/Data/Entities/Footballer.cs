using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend_66_bit.Data.Entities;

public class Footballer
{
	public int FootballerId { get; set; }
	[MaxLength(50)] public string Name { get; set; } = null!;
	[MaxLength(50)] public string Surname { get; set; } = null!;
	public Gender Gender { get; set; }
	public DateOnly BirthDate { get; set; }
	[MaxLength(50)] public string Country { get; set; } = null!;
	
	public int TeamId { get; set; }
	[ForeignKey(nameof(TeamId))] public Team Team { get; set; } = null!;
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Gender
{
	Male,
	Female
}
