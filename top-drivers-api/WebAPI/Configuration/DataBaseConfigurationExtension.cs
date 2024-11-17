using Microsoft.EntityFrameworkCore;
using TopDrivers.Infrastructure.Data;

namespace WebAPI.Configuration;

/// <summary>
/// Configuration extension for database
/// </summary>
public static class DataBaseConfigurationExtension
{
    /// <summary>
    /// Extension method to configure database
    /// </summary>
    /// <param name="services">Collection of services to use as extension</param>
    /// <param name="configuration">Configuration access</param>
    public static void ConfigureDataBase(this IServiceCollection services, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(services);
        ArgumentNullException.ThrowIfNull(configuration);
        ArgumentNullException.ThrowIfNull(configuration.GetConnectionString("TopDriver"));

        services.AddDbContext<TopDriverContext>(
            options => options.UseMySQL(configuration.GetConnectionString("TopDriver")!)
        );
    }    
}