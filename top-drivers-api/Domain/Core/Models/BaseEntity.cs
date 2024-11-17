using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Core.Models;

public class BaseEntity
{
    [Key]
    [Column(TypeName = "bigint(255)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Created { get; set; }

    [StringLength(100)]
    public string CreatedBy { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? Modified { get; set; }

    [StringLength(100)]
    public string? ModifiedBy { get; set; }

    public bool IsActive { get; set; }
}