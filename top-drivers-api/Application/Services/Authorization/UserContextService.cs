using System.Reflection;
using Application.Interfaces.Authorization;
using Application.Models.DTOs.Authorization;
using Microsoft.AspNetCore.Http;

namespace Application.Services.Authorization;

public class UserContextService(IHttpContextAccessor httpContextAccessor): IUserContextService
{
    public string? UserId
    {
        get
        {
            string? result = null;
            var httpContextItems = httpContextAccessor.HttpContext?.Items;
            if (httpContextItems != null && httpContextItems["CurrentUser"] is CurrentUser currentUser)
            {
                result = currentUser.Email;
            }

            if (string.IsNullOrEmpty(result))
            {
                result = Assembly.GetEntryAssembly()?.GetName().Name;
            }

            return result;
        }
    }
}