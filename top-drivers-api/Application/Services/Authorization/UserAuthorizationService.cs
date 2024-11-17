using Application.Interfaces;
using Application.Interfaces.Authorization;
using Application.Models.DTOs;
using AutoMapper;
using Domain.Exceptions;

namespace Application.Services.Authorization;

public class UserAuthorizationService(IUserContextService userContextService, IUserService userService, IMapper mapper) : IUserAuthorizationService
{
    /// <inheritdoc />
    public async Task<ResponseUserDto> GetLoggedUser()
    {
        var usuario = await userService.GetByEmailAsync(userContextService.UserId!);
        var user = usuario ?? throw new NotFoundException("No existe el usuario");
        return mapper.Map<ResponseUserDto>(user);
    }
}