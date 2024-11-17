using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseResourceDto : BaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Url { get; set; } = null!;
    
    public bool IsEnabled { get; set; }

    public string Path { get; set; } = null!;
}