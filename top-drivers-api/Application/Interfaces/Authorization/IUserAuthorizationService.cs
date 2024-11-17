using Application.Models.DTOs;

namespace Application.Interfaces.Authorization;

public interface IUserAuthorizationService
{
    /// <summary>
    /// Get the logged user
    /// </summary>
    /// <returns>User dto logged</returns>
    Task<ResponseUserDto> GetLoggedUser();
}