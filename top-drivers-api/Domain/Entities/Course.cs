using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace TopDrivers.Infrastructure;

[Table("Course")]
public partial class Course: BaseEntity
{
    [StringLength(50)]
    public string Name { get; set; } = null!;

    [StringLength(300)]
    public string Description { get; set; } = null!;

    [Precision(8)]
    public decimal Cost { get; set; }

    public bool IsPackage { get; set; }

    public bool IsEnabled { get; set; }

    [Column(TypeName = "int(255)")]
    public int Duration { get; set; }
}
