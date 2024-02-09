using backend_66_bit.Data;
using backend_66_bit.Data.Entities;
using backend_66_bit.Dto.Footballer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_66_bit.Dto;

namespace backend_66_bit.Footballers;

public static class FootballersModule
{
	public static void AddFootballersEndpoints(this IEndpointRouteBuilder app)
	{
		var footballersEndpoints = app.MapGroup("/footballers")
			.WithOpenApi();

		footballersEndpoints.MapGet("/", async (ApplicationDbContext dbContext) =>
			{
				var footballers = await dbContext.Footballers.Select(f => new FootballerDto()
				{
					FootballerId = f.FootballerId,
					Name = f.Name,
					Surname = f.Surname,
					Gender = f.Gender,
					BirthDate = f.BirthDate,
					Country = f.Country,
					TeamName = f.Team.TeamName
				}).ToListAsync();

				return Results.Ok(new GetFootballersResponseDto()
				{
					Footballers = footballers
				});
			})
			.Produces<GetFootballersResponseDto>()
			.WithName("Get all footballers")
			.WithTags("Footballer");

		footballersEndpoints.MapPost("/",
				async ([FromBody] AddFootballerRequestDto body, ApplicationDbContext dbContext) =>
				{
					var team = await dbContext.Teams.FirstOrDefaultAsync(t => t.TeamName == body.TeamName);
					if (team == null)
						return Results.BadRequest(new ResponseError()
						{
							Error = "Команды с таким именем не существует"
						});

					var newFootballer = new Footballer()
					{
						Name = body.Name,
						Surname = body.Surname,
						Gender = body.Gender,
						BirthDate = body.BirthDate,
						Team = team,
						Country = body.Country
					};

					await dbContext.AddAsync(newFootballer);
					await dbContext.SaveChangesAsync();

					return Results.Created();
				})
			.Accepts<AddFootballerRequestDto>("application/json")
			.Produces(StatusCodes.Status201Created)
			.Produces(StatusCodes.Status500InternalServerError)
			.WithName("Add a footballer")
			.WithTags("Footballer");

		footballersEndpoints.MapPut("/{id:int}",
				async (int id, [FromBody] UpdateFootballerRequestDto body, ApplicationDbContext dbContext) =>
				{
					if (id != body.FootballerId)
						return Results.BadRequest(new ResponseError()
						{
							Error = "Id сущности и запроса должы быть одинаковы"
						});

					var footballer = await dbContext.Footballers.FindAsync(id);

					if (footballer == null)
						return Results.NotFound();

					var team = await dbContext.Teams.FirstOrDefaultAsync(t => t.TeamName == body.TeamName);
					if (team == null)
						return Results.BadRequest(new ResponseError()
						{
							Error = "Команды с таким именем не существуем"
						});

					var newFootballer = new Footballer()
					{
						FootballerId = id,
						Name = body.Name,
						Surname = body.Surname,
						Gender = body.Gender,
						BirthDate = body.BirthDate,
						Country = body.Country,
						TeamId = team.TeamId
					};
					dbContext.Entry(footballer).CurrentValues.SetValues(newFootballer);
					await dbContext.SaveChangesAsync();

					return Results.NoContent();
				})
			.Accepts<UpdateFootballerRequestDto>("application/json")
			.Produces(StatusCodes.Status204NoContent)
			.Produces<ResponseError>(StatusCodes.Status400BadRequest)
			.Produces(StatusCodes.Status404NotFound)
			.WithName("Update a footballer")
			.WithTags("Footballer");
	}
}