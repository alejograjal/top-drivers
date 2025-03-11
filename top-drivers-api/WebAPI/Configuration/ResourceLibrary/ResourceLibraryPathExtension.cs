using Application.Models.DTOs.ResourceLibrary;

namespace WebAPI.Configuration.ResourceLibrary;

/// <summary>
/// Configure library path
/// </summary>
public static class ResourceLibraryPathExtension
{
    /// <summary>
    /// Configure the resource library path
    /// </summary>
    /// <param name="services">Collection of servers</param>
    /// <param name="configuration">Configuration access</param>
    public static void ConfigureResourceLibrary(this IServiceCollection services, IConfiguration configuration)
    {
        var resourceLibraryPathSection = configuration.GetSection("ResourceLibraryPath");
        ArgumentNullException.ThrowIfNull(resourceLibraryPathSection);

        services.Configure<ResourceLibraryPath>(resourceLibraryPathSection);
        var resourceLibraryPath = resourceLibraryPathSection.Get<ResourceLibraryPath>();

        ArgumentNullException.ThrowIfNull(resourceLibraryPath);

        services.AddSingleton(resourceLibraryPath);
    }
}