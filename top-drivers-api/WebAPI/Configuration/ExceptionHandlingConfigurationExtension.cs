using System.Net;
using Application.Models;
using Common.Helper;
using Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace WebAPI.Configuration;

/// <summary>
/// Configuration extension for exception handler
/// </summary>
public static class ExceptionHandlingConfigurationExtension
{
    /// <summary>
    /// Extension method to configure exception handler
    /// </summary>
    /// <param name="app">Application builder</param>
    /// <param name="logger">Logger</param>
    public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
    {
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                var contextFeat = context.Features.Get<IExceptionHandlerFeature>();
                if (contextFeat != null)
                {
                    var errorDetails = GetErrorDetails(contextFeat);
                    context.Response.StatusCode = errorDetails.StatusCode;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(errorDetails.ToString());
                }
            });
        });
    }

    /// <summary>
    /// Get the exact details for the error
    /// </summary>
    /// <param name="exception">Exception capture</param>
    /// <returns>ErrorDetails object</returns>
    private static ErrorDetails GetErrorDetails(IExceptionHandlerFeature exception)
    {
        HttpStatusCode httpStatusCode;
        LogLevel logLevel;
        switch (exception.Error)
        {
            case TopDriverException e:
                httpStatusCode = e.HttpStatusCode;
                logLevel = e.LogLevel;
                break;
            case NotFoundException e:
                httpStatusCode = e.HttpStatusCode;
                logLevel = e.LogLevel;
                break;
            case UnAuthorizedException e:
                httpStatusCode = e.HttpStatusCode;
                logLevel = e.LogLevel;
                break;
            case FluentValidation.ValidationException:
            case System.ComponentModel.DataAnnotations.ValidationException:
                httpStatusCode = HttpStatusCode.UnprocessableEntity;
                logLevel = LogLevel.Information;
                break;
            case NotImplementedException:
                httpStatusCode = HttpStatusCode.NotImplemented;
                logLevel = LogLevel.Error;
                break;
            case UnauthorizedAccessException:
            case KeyNotFoundException:
                httpStatusCode = HttpStatusCode.Unauthorized;
                logLevel = LogLevel.Error;
                break;
            default:
                httpStatusCode = HttpStatusCode.InternalServerError;
                logLevel = LogLevel.Error;
                break;
        }

        var errorDetails = new ErrorDetails()
        {
            Type = exception.Error.GetType().Name,
            StatusCode = (int)httpStatusCode,
            Message = ErrorHandling.GetErrorMessage(exception.Error),
            Details = exception.Error.StackTrace,
            LogLevel = logLevel
        };

        return errorDetails;
    }

}