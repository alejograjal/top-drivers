using WebAPI.Authorization;
using WebAPI.Configuration;
using WebAPI.Configuration.Authentication;
using WebAPI.Configuration.ResourceLibrary;
using WebAPI.Configuration.Swagger;

var TopDriverSpecificOrigins = "_topDriverSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddControllers().AddNewtonsoftJson(options => { });

builder.Services.AddAuthorization(opts =>
{
    opts.AddPolicy("TopDrivers", p =>
    {
        p.RequireAuthenticatedUser();
        p.AddRequirements(new IdentifiedUser());
        p.Build();
    });
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.ConfigureDataBase(configuration);

builder.Services.ConfigureAuthentication(configuration);

builder.Services.ConfigureAPIVersioning();

builder.Services.AddHttpContextAccessor();

builder.Services.ConfigureIoC(configuration);

builder.Services.ConfigureAutoMapper();

builder.Services.ConfigureFluentValidation();

builder.Services.ConfigureSwagger();

builder.Services.ConfigureResourceLibrary(configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: TopDriverSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                      });
});

var app = builder.Build();

app.LoadSwagger();

app.UseHttpsRedirection();

app.UseCors(TopDriverSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var logger = app.Services.GetRequiredService<ILogger<Program>>();
app.ConfigureExceptionHandler(logger);

app.Run();
