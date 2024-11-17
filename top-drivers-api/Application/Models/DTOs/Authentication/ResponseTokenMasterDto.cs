using Domain.Core.Models;

namespace Application.Models.DTOs.Authentication;

public class ResponseTokenMasterDto: BaseDto
{
    public string Token { get; set; } = null!;

    public string JwtId { get; set; } = null!;

    public DateTime Issued { get; set; }

    public DateTime Expiration { get; set; }

    public bool Used { get; set; }

    public long UserId { get; set; }

    public virtual ResponseUserDto UserIdNavigation { get; set; } = null!;
}