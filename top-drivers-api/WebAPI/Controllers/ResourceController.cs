using Application.Interfaces;
using Application.Models;
using Application.Models.DTOs;
using Application.Models.DTOs.Resource;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Configuration.Authorization;

namespace WebAPI.Controllers;

/// <summary>
/// Resource controller
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[TopDriversAuthorize]
[Route("api/[controller]")]
[Authorize(Policy = "TopDrivers")]
public class ResourceController(IResourceService resourceService) : ControllerBase
{
    /// <summary>
    /// Get a list of all resources
    /// </summary>
    /// <param name="includeDisabled">Filter to include or not the disabled resources</param>
    /// <returns>Action result with the full list of resources</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ResponseResourceDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetAllAsync([FromQuery] bool includeDisabled = false)
    {
        var cursos = await resourceService.GetAllAsync(includeDisabled);
        return StatusCode(StatusCodes.Status200OK, cursos);
    }

    /// <summary>
    /// Get a list of all resources
    /// </summary>
    /// <returns>Action result with the full list of resources</returns>
    [AllowAnonymous]
    [HttpGet("~/api/student-[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ResponseSimpleResourceDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetAllAsync()
    {
        var cursos = await resourceService.GetAllAsync();
        return StatusCode(StatusCodes.Status200OK, cursos);
    }

    /// <summary>
    /// Get a an exact existing resource
    /// </summary>
    /// <param name="resourceId">Resource identifier</param>
    /// <returns>Action result with an exact resource</returns>
    [HttpGet("{resourceId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseCourseDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetByIdAsync(long resourceId)
    {
        var course = await resourceService.GetByIdAsync(resourceId);
        return StatusCode(StatusCodes.Status200OK, course);
    }

    /// <summary>
    /// Create a new resource
    /// </summary>
    /// <param name="requestResourceDto">Resource model</param>
    /// <returns>Action result with the saved resource</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ResponseCourseDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> CreateAsync([FromForm] RequestResourceDto requestResourceDto)
    {
        var savedResource = await resourceService.CreateAsync(requestResourceDto);
        return StatusCode(StatusCodes.Status201Created, savedResource);
    }

    /// <summary>
    /// Update an existing resource
    /// </summary>
    /// <param name="resourceId">Resource identifier</param>
    /// <param name="requestResourceDto">Resource model to be udpated</param>
    /// <returns>Action result with the updated resource</returns>
    [HttpPut("{resourceId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResponseCourseDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> UpdateAsync(long resourceId, [FromForm] RequestResourceDto requestResourceDto)
    {
        var updateResource = await resourceService.UpdateAsync(resourceId, requestResourceDto);
        return StatusCode(StatusCodes.Status200OK, updateResource);
    }

    /// <summary>
    /// Delete an existing resource
    /// </summary>
    /// <param name="resourceId">Resource identifier</param>
    /// <returns>Action result with the the indicator of the process</returns>
    [HttpDelete("{resourceId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> DeleteAsync(long resourceId)
    {
        var resultDelete = await resourceService.DeleteAsync(resourceId);
        return StatusCode(StatusCodes.Status200OK, resultDelete);
    }
}