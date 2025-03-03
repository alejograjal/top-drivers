using Application.Models.DTOs;
using Application.Models.DTOs.Course;

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

    /// <summary>
    /// Get existing course
    /// </summary>
    /// <param name="id">Identifier of record</param>
    /// <returns>Course that matches with identifier</returns>
    Task<ResponseCourseDto> GetByIdAsync(long id);

    /// <summary>
    /// Creates a new course
    /// </summary>
    /// <param name="requestCourseDto">Model with the course information</param>
    /// <returns>Course created</returns>
    Task<ResponseCourseDto> CreateAsync(RequestCourseDto requestCourseDto);

    /// <summary>
    /// Update an existing course
    /// </summary>
    /// <param name="requestCourseDto">Model with the course information</param>
    /// <returns>Course updated</returns>
    Task<ResponseCourseDto> UpdateAsync(long id, RequestCourseDto requestCourseDto);

    /// <summary>
    /// Delete an existing course
    /// </summary>
    /// <param name="id">Identifier of record</param>
    /// <returns>True if was deleted, if not, false</returns>
    Task<bool> DeleteAsync(long id);
}