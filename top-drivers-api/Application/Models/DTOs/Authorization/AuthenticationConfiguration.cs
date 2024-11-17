namespace Application.Models.DTOs.Authorization;

public class AuthenticationConfiguration
{
    public string JwtSettings_Secret { get; set; } = null!;

    public TimeSpan JwtSettings_TokenLifetime { get; set; }
}