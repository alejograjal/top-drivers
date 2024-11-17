using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace TopDrivers.Infrastructure;

[Table("TokenMaster")]
[Index("UserId", Name = "IX_TokenMaster_UserId")]
public class TokenMaster: BaseEntity
{
    [StringLength(250)]
    public string Token { get; set; } = null!;

    [StringLength(250)]
    public string JwtId { get; set; } = null!;

    public DateTime Issued { get; set; }

    public DateTime Expiration { get; set; }

    public bool Used { get; set; }

    public long UserId { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("TokenMasters")]
    public virtual User UserIdNavigation { get; set; } = null!;
}