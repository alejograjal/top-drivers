using Application.Core.Interfaces;
using Application.Core.Services;
using Application.Interfaces;
using Application.Interfaces.Authentication;
using Application.Interfaces.Authorization;
using Application.Services;
using Application.Services.Authentication;
using Application.Services.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class Configuration
{
    public static void ConfigureGeneralServicesIoc(this IServiceCollection services)
    {
        services.AddScoped(typeof(ICoreService<>), typeof(CoreService<>));
    }

    public static void ConfigureApplicationServicesIoC(this IServiceCollection services)
    {
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<IResourceService, ResourceService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ITokenMasterService, TokenMasterService>();

        services.AddScoped<IUserContextService, UserContextService>();
        services.AddScoped<IUserAuthorizationService, UserAuthorizationService>();
    }
}