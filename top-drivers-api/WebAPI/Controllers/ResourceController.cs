using Application.Interfaces;
using Application.Models;
using Application.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

/// <summary>
/// Resource controller
/// </summary>
[ApiController]
[Route("api/[controller]")]
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
    public async Task<IActionResult> GetAllAsync([FromQuery]bool includeDisabled = false)
    {
        var cursos = await resourceService.GetAllAsync(includeDisabled);
        return StatusCode(StatusCodes.Status200OK, cursos);
    }

    /// <summary>
    /// Get a list of all resources
    /// </summary>
    /// <returns>Action result with the full list of resources</returns>
    [HttpGet("~/api/student-[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ResponseSimpleResourceDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetAllAsync()
    {
        var cursos = await resourceService.GetAllAsync();
        return StatusCode(StatusCodes.Status200OK, cursos);
    }
}