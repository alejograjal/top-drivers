using System.Text;
using Application.Interfaces.Authentication;
using Application.Models.DTOs.Authorization;
using Application.Services.Authentication;
using Infrastructure.Mappings.ValueResolvers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Authorization;

namespace WebAPI.Configuration.Authentication;

/// <summary>
/// Configuration extension for authentication
/// </summary>
public static class AuthenticationExtension
{
    /// <summary>
    /// Configure the authentication method
    /// </summary>
    /// <param name="services">Collection of servers</param>
    /// <param name="configuration">Configuration access</param>
    public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var authenticationConfigurationSection = configuration.GetSection("AuthenticationConfiguration");
        ArgumentNullException.ThrowIfNull(authenticationConfigurationSection);

        services.Configure<AuthenticationConfiguration>(authenticationConfigurationSection);
        var authenticationConfiguration = authenticationConfigurationSection.Get<AuthenticationConfiguration>();

        ArgumentNullException.ThrowIfNull(authenticationConfiguration);

        services.AddSingleton(authenticationConfiguration);
        services.AddScoped<IIdentityService, IdentityService>();

        var JwtSecretkey = Encoding.ASCII.GetBytes(authenticationConfiguration.JwtSettings_Secret);
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(JwtSecretkey),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = false,
            ValidateLifetime = true
        };

        services.AddSingleton(tokenValidationParameters);

        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = tokenValidationParameters;
        });

        services.AddTransient<UserIdResolverCreateFromBaseDTO>();
        services.AddTransient<UserIdResolverModifyFromBaseDTO>();
        services.AddScoped<IAuthorizationHandler, UserIdentityHandler>();
    }
}