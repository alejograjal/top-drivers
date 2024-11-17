using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseSimpleCourseDto : BaseSimpleDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Cost { get; set; }

    public bool IsPackage { get; set; }

    public int Duration { get; set; }
}