using backend_66_bit.Data;
using backend_66_bit.Data.Entities;
using backend_66_bit.Dto;
using backend_66_bit.Dto.Footballer;
using backend_66_bit.Dto.Team;
using backend_66_bit.Footballers;
using backend_66_bit.Teams;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1",
        new OpenApiInfo {Title = "Football catalog API", Version = "v1"});
});

builder.Services.AddCors();

var connection = builder.Configuration.GetConnectionString("Db");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsOptions => corsOptions
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader());

app.AddTeamsEndpoints();
app.AddFootballersEndpoints();

app.Run();
