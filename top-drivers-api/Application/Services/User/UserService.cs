using Application.Core.Interfaces;
using Application.Interfaces;
using Application.Models.DTOs;
using Domain.Core.Specifications;
using TopDrivers.Infrastructure;

namespace Application.Services;

public class UserService(ICoreService<User> coreService) : IUserService
{
    /// <inheritdoc />
    public async Task<ResponseUserDto?> GetByEmailAsync(string email)
    {
        var spec = new BaseSpecification<User>(m => m.Email == email);
        var user = await coreService.UnitOfWork.Repository<User>().FirstOrDefaultAsync(spec);

        if (user == null) return null;

        return coreService.AutoMapper.Map<ResponseUserDto>(user);
    }

    public async Task<ResponseUserDto?> GetByIdAsync(long id)
    {
        var data = await coreService.UnitOfWork.Repository<User>().GetByIdAsync(id);
        return coreService.AutoMapper.Map<ResponseUserDto>(data);
    }

    /// <inheritdoc />
    public async Task<ResponseUserDto?> LogInAsync(string nickName, string password)
    {
        var spec = new BaseSpecification<User>(m => m.NickName == nickName && m.Password == password);
        var user = await coreService.UnitOfWork.Repository<User>().FirstOrDefaultAsync(spec);

        if (user == null) return null;

        return coreService.AutoMapper.Map<ResponseUserDto>(user);
    }
}