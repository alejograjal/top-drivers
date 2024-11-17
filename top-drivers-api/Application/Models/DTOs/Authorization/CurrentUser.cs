using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Models.DTOs.Authorization;

public class CurrentUser
{
    public long UserId { get; init; }

    public string? Email { get; init; }
}