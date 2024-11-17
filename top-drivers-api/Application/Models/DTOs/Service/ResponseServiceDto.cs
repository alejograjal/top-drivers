using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseServiceDto : BaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public bool IsEnabled { get; set; }
}