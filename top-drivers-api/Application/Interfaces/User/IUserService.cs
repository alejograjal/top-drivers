using Application.Models.DTOs;

namespace Application.Interfaces;

public interface IUserService
{
    /// <summary>
    /// Get the exact user by id
    /// </summary>
    /// <param name="id">Id given to look for</param>
    /// <returns>User dto if exists, if not, null</returns>
    Task<ResponseUserDto?> GetByIdAsync(long id);

    /// <summary>
    /// Get the exact user by email
    /// </summary>
    /// <param name="email">Email given to look for</param>
    /// <returns>User dto if exists, if not, null</returns>
    Task<ResponseUserDto?> GetByEmailAsync(string email);

    /// <summary>
    /// Log in the user
    /// </summary>
    /// <param name="nickName">Nickname to login</param>
    /// <param name="password">Password to login</param>
    /// <returns>User dto if exists, if not, null</returns>
    Task<ResponseUserDto?> LogInAsync(string nickName, string password);
}