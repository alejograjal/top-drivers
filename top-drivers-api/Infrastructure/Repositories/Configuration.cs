using Application.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Repositories;

public static class Configuration
{
    public static void ConfigureInfrastructureIoC(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}