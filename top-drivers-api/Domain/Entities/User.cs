using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Core.Models;

namespace TopDrivers.Infrastructure;

[Table("User")]
public partial class User: BaseEntity
{
    [StringLength(100)]
    public string FirstName { get; set; } = null!;

    [StringLength(100)]
    public string LastName { get; set; } = null!;

    [StringLength(100)]
    public string Password { get; set; } = null!;

    public bool IsEnabled { get; set; }

    [StringLength(100)]
    public string Email { get; set; } = null!;

    [StringLength(100)]
    public string NickName { get; set; } = null!;

    [InverseProperty("UserIdNavigation")]
    public virtual ICollection<TokenMaster> TokenMasters { get; set; } = new List<TokenMaster>();
}
