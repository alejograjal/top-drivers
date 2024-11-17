namespace Domain.Core.Models;

public class BaseDto
{
    public long Id { get; set; }

    public DateTime Created { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime Modified { get; set; }

    public string? ModifiedBy { get; set; }

    public bool IsActive { get; set; }
}