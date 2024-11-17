using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Authorization;

/// <summary>
/// Identify user logged in
/// </summary>
public class IdentifiedUser : IAuthorizationRequirement 
{

}