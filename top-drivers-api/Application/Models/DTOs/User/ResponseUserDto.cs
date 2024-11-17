using Domain.Core.Models;

namespace Application.Models.DTOs;

public class ResponseUserDto : BaseDto
{
    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string NickName { get; set; } = null!;

    public bool IsEnabled { get; set; }
}