using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Core.Models;

namespace TopDrivers.Infrastructure;

[Table("New")]
public partial class New: BaseEntity
{
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(500)]
    public string Description { get; set; } = null!;

    public bool IsEnabled { get; set; }
}
