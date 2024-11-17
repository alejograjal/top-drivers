using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseEventDto : BaseDto
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsEnabled { get; set; }
}