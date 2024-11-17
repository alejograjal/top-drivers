using System.Net;
using Microsoft.Extensions.Logging;

namespace Domain.Exceptions;

public class TopDriverException : BaseException
{
    public override LogLevel LogLevel { get; set; } = LogLevel.Information;

    public override HttpStatusCode HttpStatusCode => HttpStatusCode.InternalServerError;

    public TopDriverException(string message) : base(message)
    {
    }
}