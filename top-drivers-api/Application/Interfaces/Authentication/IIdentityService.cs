using Application.Models.DTOs.Authentication;

namespace Application.Interfaces.Authentication;

public interface IIdentityService
{
    /// <summary>
    /// Login process method
    /// </summary>
    /// <param name="login">User login details</param>
    /// <returns>Token model with token and refresh token</returns>
    Task<TokenModel> LoginAsync(RequestUserLoginDto login);

    /// <summary>
    /// Refresh token
    /// </summary>
    /// <param name="request">User login details</param>
    /// <returns>Token model with token and refresh token that has been refreshed</returns>
    Task<TokenModel> RefreshTokenAsync(TokenModel request);
}