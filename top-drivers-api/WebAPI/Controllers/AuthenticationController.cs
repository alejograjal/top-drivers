using Application.Interfaces.Authentication;
using Application.Models;
using Application.Models.DTOs.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

/// <summary>
/// Initializes a new instance of the AuthenticationController with the specified service identity.
/// </summary>
/// <param name="identityService">The service identity used for authentication operations.</param>
[ApiController]
[Route("api/[controller]")]
public class AuthenticationController(IIdentityService identityService) : ControllerBase
{
    /// <summary>
    /// Logs in a user using the provided login model.
    /// </summary>
    /// <param name="requestUserLoginDto">The login credentials.</param>
    /// <returns>An action result with authentication details or an error.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthenticationResult))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> LogInAsync(RequestUserLoginDto requestUserLoginDto)
    {
        var login = await identityService.LoginAsync(requestUserLoginDto);
        return StatusCode(StatusCodes.Status200OK, login);
    }

    /// <summary>
    /// Refreshes the authentication token using the provided token model.
    /// </summary>
    /// <param name="tokenModel">The token refresh request.</param>
    /// <returns>An action result with the new authentication token or an error.</returns>
    [Route("refreshToken")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthenticationResult))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> RefreshTokenAsync([FromBody] TokenModel tokenModel)
    {
        var refreshToken = await identityService.RefreshTokenAsync(tokenModel);
        return StatusCode(StatusCodes.Status200OK, refreshToken);
    }
}