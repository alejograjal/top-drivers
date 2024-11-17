using System.Data;
using Application;
using Infrastructure.Repositories;
using MySql.Data.MySqlClient;

namespace WebAPI.Configuration;

/// <summary>
/// Configuration extension for all the injections
/// </summary>
public static class IoCConfiguration
{
    /// <summary>
    /// Extension method to configure injections
    /// </summary>
    /// <param name="services">Collection of services to use as extension</param>
    /// <param name="configuration">Configuration access</param>
    public static void ConfigureIoC(this IServiceCollection services, ConfigurationManager configuration)
    {
        ArgumentNullException.ThrowIfNull(services);

        services.AddTransient<IDbConnection>(database => new MySqlConnection(configuration.GetConnectionString("TopDriver")));

        services.ConfigureGeneralServicesIoc();
        services.ConfigureApplicationServicesIoC();
        services.ConfigureInfrastructureIoC();
    }
}