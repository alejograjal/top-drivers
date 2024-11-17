namespace Application.Models.DTOs.Authentication;

public class RequestUserLoginDto
{
    public string NickName { get; set; } = null!;

    public string Password { get; set; } = null!;
}