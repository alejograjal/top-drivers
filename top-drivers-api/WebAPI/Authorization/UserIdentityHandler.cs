using Application.Models.DTOs.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Authorization;

/// <summary>
/// Manage all the users identify
/// </summary>
public class UserIdentityHandler : AuthorizationHandler<IdentifiedUser>
{
    /// <summary>
    /// Handle each request to get claims
    /// </summary>
    /// <param name="context">Authorization handler context</param>
    /// <param name="requirement">Identified user</param>
    /// <returns>Task</returns>
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IdentifiedUser requirement)
    {
        var httpContext = (HttpContext)context.Resource!;
        var claimFinder = new ClaimFinder(context.User.Claims);

        if (claimFinder.UserId != null && claimFinder.Email != null)
        {
            httpContext.Items["CurrentUser"] = new CurrentUser
            {
                UserId = long.Parse(claimFinder.UserId!.Value),
                Email = claimFinder.Email!.Value,
            };
        }

        context.Succeed(requirement);
        return Task.CompletedTask;
    }
}