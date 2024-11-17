using Application.Models.DTOs;

namespace Application.Interfaces;

public interface ICourseService
{
    /// <summary>
    /// Get all the courses, can also include the disabled registries 
    /// </summary>
    /// <param name="includeInactive">Filter indicating load disabled too, by default is set to false</param>
    /// <returns>List of course Dto</returns>
    Task<IReadOnlyCollection<ResponseCourseDto>> GetAllAsync(bool includeDisabled = false);

    /// <summary>
    /// Get all the courses
    /// </summary>
    /// <returns>Simplify list of course Dto</returns>
    Task<IReadOnlyCollection<ResponseSimpleCourseDto>> GetAllAsync();
}