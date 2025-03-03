using Application.Interfaces;
using Application.Models;
using Application.Models.DTOs;
using Application.Models.DTOs.Course;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Configuration.Authorization;

namespace WebAPI.Controllers;

/// <summary>
/// Course controller
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[TopDriversAuthorize]
[Route("api/[controller]")]
[Authorize(Policy = "TopDrivers")]
public class CourseController(ICourseService courseService) : ControllerBase
{
    /// <summary>
    /// Get a list of all course with disabling filter option
    /// </summary>
    /// <param name="includeDisabled">Filter to include or not the disabled courses</param>
    /// <returns>Action result with the full list of courses</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ResponseCourseDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetAllAsync([FromQuery] bool includeDisabled = false)
    {
        var courses = await courseService.GetAllAsync(includeDisabled);
        return StatusCode(StatusCodes.Status200OK, courses);
    }

    /// <summary>
    /// Get a an exact existing course
    /// </summary>
    /// <param name="courseId">Course identifier</param>
    /// <returns>Action result with an exact course</returns>
    [HttpGet("{courseId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseCourseDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetByIdAsync(long courseId)
    {
        var course = await courseService.GetByIdAsync(courseId);
        return StatusCode(StatusCodes.Status200OK, course);
    }


    /// <summary>
    /// Get a list of all course
    /// </summary>
    /// <returns>Action result with the full list of courses</returns>
    [HttpGet("~/api/student-[controller]")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ResponseSimpleCourseDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetAllAsync()
    {
        var courses = await courseService.GetAllAsync();
        return StatusCode(StatusCodes.Status200OK, courses);
    }

    /// <summary>
    /// Create a new course
    /// </summary>
    /// <param name="requestCourseDto">Course model</param>
    /// <returns>Action result with the saved course</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ResponseCourseDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> CreateAsync(RequestCourseDto requestCourseDto)
    {
        var savedCourse = await courseService.CreateAsync(requestCourseDto);
        return StatusCode(StatusCodes.Status201Created, savedCourse);
    }

    /// <summary>
    /// Update an existing course
    /// </summary>
    /// <param name="courseId">Course identifier</param>
    /// <param name="requestCourseDto">Course model to be udpated</param>
    /// <returns>Action result with the updated course</returns>
    [HttpPut("{courseId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseCourseDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> UpdateAsync(long courseId, RequestCourseDto requestCourseDto)
    {
        var savedCourse = await courseService.UpdateAsync(courseId, requestCourseDto);
        return StatusCode(StatusCodes.Status200OK, savedCourse);
    }

    /// <summary>
    /// Delete an existing course
    /// </summary>
    /// <param name="courseId">Course identifier</param>
    /// <returns>Action result with the the indicator of the process</returns>
    [HttpDelete("{courseId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> DeleteAsync(long courseId)
    {
        var savedCourse = await courseService.DeleteAsync(courseId);
        return StatusCode(StatusCodes.Status200OK, savedCourse);
    }
}