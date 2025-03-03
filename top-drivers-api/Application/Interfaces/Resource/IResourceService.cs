using Application.Models.DTOs;
using Application.Models.DTOs.Resource;

namespace Application.Interfaces;

public interface IResourceService
{
    /// <summary>
    /// Creates a new resource
    /// </summary>
    /// <param name="requestResourceDto">Model with the resource information</param>
    /// <returns>Resource created</returns>
    Task<ResponseResourceDto> CreateAsync(RequestResourceDto requestResourceDto);

    /// <summary>
    /// Update an existing resource
    /// </summary>
    /// <param name="requestResourceDto">Model with the resource information</param>
    /// <returns>Resource updated</returns>
    Task<ResponseResourceDto> UpdateAsync(long id, RequestResourceDto requestResourceDto);

    /// <summary>
    /// Get all the resources, can also include the disabled registries 
    /// </summary>
    /// <param name="includeInactive">Filter indicating load disabled too, by default is set to false</param>
    /// <returns>List of resources Dto</returns>
    Task<IReadOnlyCollection<ResponseResourceDto>> GetAllAsync(bool includeDisabled = false);

    /// <summary>
    /// Get all the resources
    /// </summary>
    /// <returns>List of resources Dto</returns>
    Task<IReadOnlyCollection<ResponseResourceDto>> GetAllAsync();

    /// <summary>
    /// Get existing resource
    /// </summary>
    /// <param name="id">Identifier of record</param>
    /// <returns>Resource that matches with identifier</returns>
    Task<ResponseResourceDto> GetByIdAsync(long id);

    /// <summary>
    /// Delete an existing resource
    /// </summary>
    /// <param name="id">Identifier of record</param>
    /// <returns>True if was deleted, if not, false</returns>
    Task<bool> DeleteAsync(long id);
}