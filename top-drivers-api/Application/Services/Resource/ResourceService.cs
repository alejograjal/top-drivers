using Application.Core.Interfaces;
using Application.Interfaces;
using Application.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using TopDrivers.Infrastructure;

namespace Application.Services;

public class ResourceService(ICoreService<Resource> coreService) : IResourceService
{
    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseResourceDto>> GetAllAsync(bool includeDisabled = false)
    {
        var query =
            from s in coreService.UnitOfWork.Repository<Course>().AsQueryable()
            where s.IsEnabled || s.IsEnabled == !includeDisabled
            select s;

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseResourceDto>>(await query.ToListAsync());
    }

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseResourceDto>> GetAllAsync()
    {
        var query =
            from s in coreService.UnitOfWork.Repository<Course>().AsQueryable()
            where s.IsEnabled
            select s;

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseResourceDto>>(await query.ToListAsync());
    }
}