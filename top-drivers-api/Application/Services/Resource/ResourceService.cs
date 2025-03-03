using FluentValidation;
using Domain.Exceptions;
using Application.Interfaces;
using Application.Models.DTOs;
using TopDrivers.Infrastructure;
using Domain.Core.Specifications;
using Application.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Application.Models.DTOs.Resource;

namespace Application.Services;

public class ResourceService(ICoreService<Resource> coreService, IValidator<Resource> resourceValidator) : IResourceService
{
    public async Task<ResponseResourceDto> CreateAsync(RequestResourceDto requestResourceDto)
    {
        var resource = ValidateResource(requestResourceDto);

        var data = await coreService.UnitOfWork.Repository<Resource>().AddAsync(resource);
        await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(data.Id);
    }

    public async Task<bool> DeleteAsync(long id)
    {
        if (!await ExistsResourcesync(id))
        {
            throw new NotFoundException("Imagen no existe");
        }

        var spec = new BaseSpecification<Resource>(m => m.Id == id);
        var resource = await coreService.UnitOfWork.Repository<Resource>().FirstOrDefaultAsync(spec);
        resource!.IsActive = false;

        coreService.UnitOfWork.Repository<Resource>().Update(resource);
        return await coreService.UnitOfWork.SaveChangesAsync() != 0;
    }

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseResourceDto>> GetAllAsync(bool includeDisabled = false)
    {
        var query = coreService.UnitOfWork.Repository<Resource>().AsQueryable().Where(m => m.IsActive && (m.IsEnabled || m.IsEnabled == !includeDisabled));

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseResourceDto>>(await query.ToListAsync());
    }

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseResourceDto>> GetAllAsync()
    {
        var query = coreService.UnitOfWork.Repository<Resource>().AsQueryable().Where(m => m.IsActive && m.IsEnabled);

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseResourceDto>>(await query.ToListAsync());
    }

    /// <inheritdoc />
    public async Task<ResponseResourceDto> GetByIdAsync(long id)
    {
        var spec = new BaseSpecification<Resource>(m => m.Id == id);
        var resource = await coreService.UnitOfWork.Repository<Resource>().FirstOrDefaultAsync(spec);

        if (resource == null || !resource.IsActive)
        {
            throw new NotFoundException("Imagen no existe");
        }

        return coreService.AutoMapper.Map<ResponseResourceDto>(resource);
    }

    /// <inheritdoc />
    public async Task<ResponseResourceDto> UpdateAsync(long id, RequestResourceDto requestResourceDto)
    {
        requestResourceDto.Id = id;
        if (!await ExistsResourcesync(requestResourceDto.Id))
        {
            throw new NotFoundException("Imagen no existe");
        }

        var resource = ValidateResource(requestResourceDto);
        resource.Id = requestResourceDto.Id;
        resource.IsActive = true;

        coreService.UnitOfWork.Repository<Resource>().Update(resource);
        await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(requestResourceDto.Id);
    }

    private async Task<bool> ExistsResourcesync(long id) => await coreService.UnitOfWork.Repository<Course>().ExistsAsync(id);

    private Resource ValidateResource(RequestResourceDto requestResourceDto)
    {
        var resource = coreService.AutoMapper.Map<Resource>(requestResourceDto);
        resourceValidator.ValidateAndThrow(resource);

        return resource;
    }
}