using System.Net;
using System.Runtime.Serialization;
using Microsoft.Extensions.Logging;

namespace Domain.Exceptions;

public abstract class BaseException : ApplicationException
{
    public abstract LogLevel LogLevel { get; set; }

    public abstract HttpStatusCode HttpStatusCode { get; }

    protected BaseException(string message) : base(message)
    {
    }

    #pragma warning disable SYSLIB0051 // Type or member is obsolete
    protected BaseException(SerializationInfo info, StreamingContext context) : base(info, context) { }
    #pragma warning restore SYSLIB0051 // Type or member is obsolete
}