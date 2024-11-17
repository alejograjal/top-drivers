using Asp.Versioning;

namespace WebAPI.Configuration;

/// <summary>
/// Configuration extension for api versioning
/// </summary>
public static class APIVersioningConfigurationExtension
{
    /// <summary>
    /// Extended method to configure versioning
    /// </summary>
    /// <param name="services">Collection of services to use as extension</param>
    public static void ConfigureAPIVersioning(this IServiceCollection services)
    {
        services.AddApiVersioning(opt =>
        {
            opt.DefaultApiVersion = new ApiVersion(1, 0);
            opt.AssumeDefaultVersionWhenUnspecified = true;
            opt.ReportApiVersions = true;
            opt.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
        })
        .AddMvc()
        .AddApiExplorer(opt =>
        {
            opt.GroupNameFormat = "'v'VVV";
            opt.SubstituteApiVersionInUrl = true;
            opt.AssumeDefaultVersionWhenUnspecified = true;
            opt.DefaultApiVersion = new ApiVersion(1, 0);
        });
    }
}