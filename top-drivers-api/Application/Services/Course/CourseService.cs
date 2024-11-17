using FluentValidation;
using Application.Core.Interfaces;
using Application.Interfaces;
using Application.Models.DTOs;
using TopDrivers.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class CourseService(ICoreService<Course> coreService) : ICourseService
{
    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseCourseDto>> GetAllAsync(bool includeDisabled = false)
    {
        var query =
            from s in coreService.UnitOfWork.Repository<Course>().AsQueryable()
            where s.IsEnabled || s.IsEnabled == !includeDisabled
            select s;

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseCourseDto>>(await query.ToListAsync());
    }

    /// <inheritdoc />
    public async Task<IReadOnlyCollection<ResponseSimpleCourseDto>> GetAllAsync()
    {
        var query =
            from s in coreService.UnitOfWork.Repository<Course>().AsQueryable()
            where s.IsEnabled
            select s;

        return coreService.AutoMapper.Map<IReadOnlyCollection<ResponseSimpleCourseDto>>(await query.ToListAsync());
    }
}