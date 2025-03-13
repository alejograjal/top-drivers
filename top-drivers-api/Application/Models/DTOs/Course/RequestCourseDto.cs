using Application.Models.DTOs.Core;

namespace Application.Models.DTOs.Course;

public class RequestCourseDto : RequestBaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Cost { get; set; }

    public bool IsPackage { get; set; }

    public bool IsEnabled { get; set; }

    public int Duration { get; set; }
}