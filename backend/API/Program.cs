using API.Cases;
using API.Repositories;
using API.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("MySQL");
IDbConnection db = new MySqlConnection(connectionString);

// Add services to the container.
builder.Services.AddSingleton<IDbConnection>(db);

builder.Services.AddTransient<ICityRepository, MySQLCityRepository>();
builder.Services.AddTransient<IUnitTypeRepository, MySQLUnitTypeRepository>();
builder.Services.AddTransient<IStablishmentTypeRepository, MySQLStablishmentTypeRepository>();
builder.Services.AddTransient<IStablishmentRepository, MySQLStablishmentRepository>();

builder.Services.AddTransient<GetAllCitiesCase>();
builder.Services.AddTransient<GetAllTypesCase>();
builder.Services.AddTransient<SearchCase>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
