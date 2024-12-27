using System.Reflection;
using Asp.Versioning.ApiExplorer;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.OpenApi.Models;

namespace WebAPI.Configuration.Swagger;

/// <summary>
/// Configuration extension for swagger
/// </summary>
public static class SwaggerConfiguration
{
    /// <summary>
    /// Extension method to configure swagger
    /// </summary>
    /// <param name="services">Collection of services to use as extension</param>
    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddFluentValidationRulesToSwagger();

        services.AddSwaggerGen(opts => 
        {
            opts.AddSecurityDefinition(name: "Bearer", securityScheme: new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using Bearer schema",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer"
            });
            opts.AddSecurityRequirement(new OpenApiSecurityRequirement{
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });

            opts.OperationFilter<AuthorizeOperationFilter>();

            opts.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
        });

        services.AddSwaggerGenNewtonsoftSupport();

        services.ConfigureOptions<SwaggerConfigurationOptions>();
    }

    /// <summary>
    /// Load the default values for swagger
    /// </summary>
    /// <param name="app">WebApplication access extension</param>
    /// <returns>WebApplication object with changes applied</returns>
    public static WebApplication LoadSwagger(this WebApplication app)
    {
        app.UseSwagger(opt =>
        {
            var environment = app.Services.GetRequiredService<IHostEnvironment>();
            if (environment.IsProduction())
            {
                opt.RouteTemplate = "api/swagger/{documentName}/swagger.json";
            }
            else
            {
                opt.RouteTemplate = "swagger/{documentName}/swagger.json";
            }
        });

        app.UseSwaggerUI(opt =>
        {
            var apiVersionDescriptionProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
            var groupNames = from description in apiVersionDescriptionProvider.ApiVersionDescriptions
                                select description.GroupName;
            
            foreach (var groupName in groupNames)
            {
                var environment = app.Services.GetRequiredService<IHostEnvironment>();
                if (environment.IsProduction())
                {
                    // Production: Swagger under /api/swagger
                    opt.SwaggerEndpoint($"/api/swagger/{groupName}/swagger.json", groupName.ToUpperInvariant());
                    opt.RoutePrefix = "api/swagger";
                }
                else
                {
                    // Local: Swagger under /swagger
                    opt.SwaggerEndpoint($"/swagger/{groupName}/swagger.json", groupName.ToUpperInvariant());
                    opt.RoutePrefix = "swagger";
                }
            }
        });

        return app;
    }
}