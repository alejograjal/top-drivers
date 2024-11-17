using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace TopDrivers.Infrastructure;

[Table("Resource")]
public partial class Resource: BaseEntity
{
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(500)]
    public string Description { get; set; } = null!;

    [StringLength(150)]
    public string Url { get; set; } = null!;
    
    public bool IsEnabled { get; set; }

    [StringLength(150)]
    public string Path { get; set; } = null!;
}
