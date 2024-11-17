using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Configuration.Authorization;

/// <summary>
/// Authorize attribute
/// </summary>
public class TopDriversAuthorizeAttribute : AuthorizeAttribute
{
    /// <summary>
    /// Default constructor
    /// </summary>
    /// <returns></returns>
    public TopDriversAuthorizeAttribute() : base() { }
}