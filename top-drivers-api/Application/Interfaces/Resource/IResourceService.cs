using Application.Models.DTOs;

namespace Application.Interfaces;

public interface IResourceService
{
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
}