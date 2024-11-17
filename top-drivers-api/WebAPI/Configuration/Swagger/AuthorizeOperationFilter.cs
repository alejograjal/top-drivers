
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using WebAPI.Configuration.Authorization;

namespace WebAPI.Configuration.Swagger;

/// <summary>
/// Authorize operation filter class
/// </summary>
public class AuthorizeOperationFilter : IOperationFilter
{
    /// <summary>
    /// Apply Authorization operation of requests
    /// </summary>
    /// <param name="operation">Open api operation</param>
    /// <param name="context">Operation filter context</param>
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var authorizeAttributeOnMethod = context.MethodInfo.GetCustomAttributes<TopDriversAuthorizeAttribute>().Any();
        var authorizeAttributeOnClass = context.MethodInfo.DeclaringType?.GetCustomAttributes<TopDriversAuthorizeAttribute>().Any() ?? false;
        var authorizeAttributeOnParentClass = context.MethodInfo.DeclaringType?.BaseType?.GetCustomAttributes<TopDriversAuthorizeAttribute>().Any() ?? false;
        var allowAnonymusOnMethod = context.MethodInfo.GetCustomAttributes<AllowAnonymousAttribute>() != null;

        if(authorizeAttributeOnMethod || ((authorizeAttributeOnClass || authorizeAttributeOnParentClass) && !allowAnonymusOnMethod))
        {
            operation.Responses.Add(StatusCodes.Status401Unauthorized.ToString(), new OpenApiResponse { Description = "Unauthorized" });
            operation.Responses.Add(StatusCodes.Status403Forbidden.ToString(), new OpenApiResponse { Description = "Forbidden" });

            operation.Security = new List<OpenApiSecurityRequirement>
            {
                new OpenApiSecurityRequirement
                {
                    [BearerSchema] = new List<string> { "Bearer" }
                }
            };
        }
    }

    private static OpenApiSecurityScheme BearerSchema = new OpenApiSecurityScheme
    {
        Reference = new OpenApiReference{ Type = ReferenceType.SecurityScheme, Id = "Bearer"}
    };
}