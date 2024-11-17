using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseSimpleResourceDto: BaseSimpleDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Url { get; set; } = null!;
}