using System.Security.Claims;

namespace WebAPI.Authorization;

/// <summary>
/// Used as a searcher for claims
/// </summary>
public class ClaimFinder(IEnumerable<Claim> claims)
{
    public Claim? UserId { get => claims.FirstOrDefault(m => m.Type == "UserId"); }

    public Claim? Email { get => claims.FirstOrDefault(m => m.Type == "Email"); }
}