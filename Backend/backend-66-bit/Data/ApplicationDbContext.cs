using backend_66_bit.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend_66_bit.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
	public DbSet<Team> Teams { get; set; } = null!;
	public DbSet<Footballer> Footballers { get; set; } = null!;
}