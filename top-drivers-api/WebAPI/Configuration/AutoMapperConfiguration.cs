
using Infrastructure.Mappings.MySqlMappers;

namespace WebAPI.Configuration;

/// <summary>
/// Configuration extension for auto mapper
/// </summary>
public static class AutoMapperConfiguration
{
    /// <summary>
    /// Extension method to configure auto mapper
    /// </summary>
    /// <param name="services">Collection of services to use as extension</param>
    public static void ConfigureAutoMapper(this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);

        services.AddAutoMapper(typeof(ModelToDtoMappingProfile));
        services.AddAutoMapper(typeof(DtoToModelMappingProfile));
    }
}