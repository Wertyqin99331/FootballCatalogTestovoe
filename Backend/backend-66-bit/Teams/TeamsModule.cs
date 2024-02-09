using backend_66_bit.Data;
using backend_66_bit.Data.Entities;
using backend_66_bit.Dto;
using backend_66_bit.Dto.Team;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_66_bit.Teams;

public static class TeamsModule
{
	public static void AddTeamsEndpoints(this IEndpointRouteBuilder app)
	{
		var teamsEndpoints = app.MapGroup("/teams")
			.WithOpenApi();

		teamsEndpoints.MapGet("/", async (ApplicationDbContext dbContext, ILogger<Program> logger) =>
			{
				var teams = await dbContext.Teams.Select(t => t.TeamName).ToListAsync();
				if (teams.Count == 0)
					return Results.NotFound();


				return Results.Ok(new GetTeamsResponseDto()
				{
					TeamsList = teams
				});
			})
			.Produces<GetTeamsResponseDto>()
			.Produces(StatusCodes.Status404NotFound)
			.Produces(StatusCodes.Status500InternalServerError)
			.WithName("Get the list of all team names")
			.WithTags("Team");


		teamsEndpoints.MapPost("/", async ([FromBody] AddTeamRequestDto body, ApplicationDbContext dbContext) =>
			{
				if (await dbContext.Teams.AnyAsync(t => t.TeamName == body.TeamName))
					return Results.BadRequest(new ResponseError()
					{
						Error = "Команда с таким именем уже существует"
					});

				var newTeam = new Team()
				{
					TeamName = body.TeamName
				};

				await dbContext.AddAsync(newTeam);
				await dbContext.SaveChangesAsync();

				return Results.Created();
			})
			.Accepts<AddTeamRequestDto>("application/json")
			.Produces(StatusCodes.Status201Created)
			.Produces<ResponseError>(StatusCodes.Status400BadRequest)
			.Produces(StatusCodes.Status500InternalServerError)
			.WithName("Add a team")
			.WithTags("Team");
	}
}