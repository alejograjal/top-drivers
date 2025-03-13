using FluentValidation;
using Domain.Exceptions;
using Application.Interfaces;
using Application.Models.DTOs;
using TopDrivers.Infrastructure;
using Domain.Core.Specifications;
using Application.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Application.Models.DTOs.Resource;
using Application.Models.DTOs.ResourceLibrary;
using System.Diagnostics;

namespace Application.Services;

public class ResourceService(ICoreService<Resource> coreService, ResourceLibraryPath resourceLibraryPath, IValidator<Resource> resourceValidator) : IResourceService
{
    public async Task<ResponseResourceDto> CreateAsync(RequestResourceDto requestResourceDto)
    {
        var resource = ValidateResource(requestResourceDto);
        resource.Path = Path.Combine(resourceLibraryPath.Path, $"{resource.Name}{Path.GetExtension(requestResourceDto.Resource.FileName)}");
        resource.Url = Path.Combine(resourceLibraryPath.Url, $"{resource.Name}{Path.GetExtension(requestResourceDto.Resource.FileName)}");

        if (!Directory.Exists(resourceLibraryPath.Path))
        {
            Directory.CreateDirectory(resourceLibraryPath.Path);
        }

        using (var fileStream = new FileStream(resource.Path, FileMode.Create, FileAccess.Write))
        {
            await requestResourceDto.Resource.CopyToAsync(fileStream);
        }

        Process.Start("chown", $"www-data:www-data \"{resource.Path}\"")?.WaitForExit();
        Process.Start("chmod", $"644 \"{resource.Path}\"")?.WaitForExit();

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
    public async Task<IReadOnlyCollection<ResponseSimpleResourceDto>> GetAllAsync()
    {
        var query = coreService.UnitOfWork.Repository<Resource>().AsQueryable().Where(m => m.IsActive && m.IsEnabled);

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseSimpleResourceDto>>(await query.ToListAsync());
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

        var existingResource = await GetByIdAsync(requestResourceDto.Id);

        var resource = ValidateResource(requestResourceDto);
        resource.Id = requestResourceDto.Id;
        resource.IsActive = true;
        if (requestResourceDto.Resource != null)
        {
            resource.Path = Path.Combine(resourceLibraryPath.Path, $"{resource.Name}{Path.GetExtension(requestResourceDto.Resource.FileName)}");
            resource.Url = Path.Combine(resourceLibraryPath.Url, $"{resource.Name}{Path.GetExtension(requestResourceDto.Resource.FileName)}");

            using (var fileStream = new FileStream(resource.Path, FileMode.Create, FileAccess.Write))
            {
                await requestResourceDto.Resource.CopyToAsync(fileStream);
            }

            Process.Start("chown", $"www-data:www-data \"{resource.Path}\"")?.WaitForExit();
            Process.Start("chmod", $"644 \"{resource.Path}\"")?.WaitForExit();

            if (File.Exists(existingResource.Path))
            {
                File.Delete(existingResource.Path);
            }
        }
        else
        {
            resource.Path = existingResource.Path;
            resource.Url = existingResource.Url;
        }

        coreService.UnitOfWork.Repository<Resource>().Update(resource);
        await coreService.UnitOfWork.SaveChangesAsync();

        return await GetByIdAsync(requestResourceDto.Id);
    }

    private async Task<bool> ExistsResourcesync(long id) => await coreService.UnitOfWork.Repository<Resource>().ExistsAsync(id);

    private Resource ValidateResource(RequestResourceDto requestResourceDto)
    {
        var resource = coreService.AutoMapper.Map<Resource>(requestResourceDto);
        resourceValidator.ValidateAndThrow(resource);

        return resource;
    }
}