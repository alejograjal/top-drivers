using Asp.Versioning.ApiExplorer;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace WebAPI.Configuration.Swagger;

/// <summary>
/// Swagger Configuration class to manage versioning with the information
/// </summary>
public class SwaggerConfigurationOptions(IApiVersionDescriptionProvider _provider) : IConfigureNamedOptions<SwaggerGenOptions>
{
    /// <summary>
    /// Configure versioning with specific name
    /// </summary>
    /// <param name="name">Given name</param>
    /// <param name="options">Swagger generation options</param>
    public void Configure(string? name, SwaggerGenOptions options) => Configure(options);

    /// <summary>
    /// Configure versioning
    /// </summary>
    /// <param name="options">Swagger generation options</param>
    public void Configure(SwaggerGenOptions options)
    {
        if (options == null) return;

        foreach (var item in _provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(item.GroupName, CreateVersionInfo(item));
        }
    }

    /// <summary>
    /// Create the appriopate Open api information for an specific version
    /// </summary>
    /// <param name="apiDescription">Api versioning</param>
    /// <returns>OpenApiInfo object with all the values</returns>
    private static OpenApiInfo CreateVersionInfo(ApiVersionDescription apiDescription)
    {
        if (apiDescription == null) return new OpenApiInfo();

        var info = new OpenApiInfo()
        {
            Version = apiDescription.ApiVersion.ToString(),
            Title = "Top Drivers WebAPI",
            Description = "List of APIs to handle operations for the Top Drivers WebAPI app",
            Contact = new OpenApiContact
            {
                Name = "Alejandro Grajal",
                Email = "alejandro.grajal.s@gmail.com"
            }
        };

        if (apiDescription.IsDeprecated) info.Description = "This API version was deprecated. Please use one of the new APIs available from the explorer";

        return info;
    }
}