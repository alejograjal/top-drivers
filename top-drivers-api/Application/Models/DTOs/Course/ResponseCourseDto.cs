using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseCourseDto: BaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Cost { get; set; }

    public bool IsPackage { get; set; }

    public bool IsEnabled { get; set; }

    public int Duration { get; set; }
}