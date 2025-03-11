using Application.Models.DTOs.Core;
using Microsoft.AspNetCore.Http;

namespace Application.Models.DTOs.Resource;

public class RequestResourceDto : RequestBaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public IFormFile Resource { get; set; } = null!;

    public bool IsEnabled { get; set; }
}