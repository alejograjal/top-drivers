using Application.Interfaces;
using Application.Models;
using Application.Models.DTOs;
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
    public async Task<IActionResult> GetAllAsync([FromQuery]bool includeDisabled = false)
    {
        var courses = await courseService.GetAllAsync(includeDisabled);
        return StatusCode(StatusCodes.Status200OK, courses);
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
}