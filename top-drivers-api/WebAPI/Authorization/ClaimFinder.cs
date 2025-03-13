using System.Security.Claims;

namespace WebAPI.Authorization;

/// <summary>
/// Used as a searcher for claims
/// </summary>
public class ClaimFinder(IEnumerable<Claim> claims)
{
    /// <summary>
    /// Claim definition for user id
    /// </summary>
    /// <returns>User id from the claim</returns>
    public Claim? UserId { get => claims.FirstOrDefault(m => m.Type == "UserId"); }

    /// <summary>
    /// Claim definition for email
    /// </summary>
    /// <returns>Email from the claim</returns>
    public Claim? Email { get => claims.FirstOrDefault(m => m.Type == "Email"); }
}