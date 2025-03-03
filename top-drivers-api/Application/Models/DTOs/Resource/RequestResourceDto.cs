using Application.Models.DTOs.Core;

namespace Application.Models.DTOs.Resource;

public class RequestResourceDto : RequestBaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string Path { get; set; } = null!;

    public bool IsEnabled { get; set; }
}