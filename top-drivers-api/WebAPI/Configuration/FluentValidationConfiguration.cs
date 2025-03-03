using Domain.Validations;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace WebAPI.Configuration;

/// <summary>
/// Configuration extension for fluent validation
/// </summary>
public static class FluentValidationConfiguration
{
    /// <summary>
    /// Extension method to configure fluent validation
    /// </summary>
    /// <param name="services">Collection of services to use as extension</param>
    public static void ConfigureFluentValidation(this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);

        services.AddValidatorsFromAssemblyContaining<CourseValidator>();

        services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
    }
}