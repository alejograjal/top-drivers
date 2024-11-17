using Application.Models.DTOs.Authentication;
using TopDrivers.Infrastructure;

namespace Application.Interfaces.Authentication;

public interface ITokenMasterService
{
    /// <summary>
    /// Get an exact token master by id
    /// </summary>
    /// <param name="id">Id to look for</param>
    /// <returns>Token master</returns>
    Task<ResponseTokenMasterDto> GetByIdAsync(long id);

    /// <summary>
    /// Get an exact token master by token
    /// </summary>
    /// <param name="token">Token to look for</param>
    /// <returns>Token master</returns>
    Task<TokenMaster?> GetByTokenAsync(string token);

    /// <summary>
    /// Create a token 
    /// </summary>
    /// <param name="tokenMaster">Token master entity to be added</param>
    /// <returns>Token master for jwt</returns>
    Task<ResponseTokenMasterDto> CreateAsync(TokenMaster tokenMaster);

    /// <summary>
    /// Update a token 
    /// </summary>
    /// <param name="tokenMaster">Token master entity to be added</param>
    /// <returns>Token master for jwt</returns>
    Task<ResponseTokenMasterDto> UpdateAsync(TokenMaster tokenMaster);

    /// <summary>
    /// Validate if exists a token
    /// </summary>
    /// <param name="id">id to look for</param>
    /// <returns>True if exits, false if not</returns>
    Task<bool> ExistsAsync(long id);

    /// <summary>
    /// Validate if exists a token
    /// </summary>
    /// <param name="token">Token to look for</param>
    /// <returns>True if exits, false if not</returns>
    Task<bool> ExistsAsync(string token);
}